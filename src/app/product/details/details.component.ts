import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IComment } from 'src/app/interfaces/IComment';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { IProduct } from 'src/app/interfaces/IProduct';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { FileuploadService } from 'src/app/shared/services/fileupload.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(public db: AngularFirestore, public router: Router,
    private activatedRoute: ActivatedRoute, public storage: AngularFireStorage,
    public authService: AuthService, public commentService: CommentService) { }

  profileUrl: Observable<string | null>;
  product: IProduct;
  user: IEmployee;
  comments: IComment[];

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.activatedRoute.params.subscribe(params => {
      const id: string = params['id'];
      setTimeout(() => {
        this.db.collection('product').doc(id).snapshotChanges()
          .subscribe((response) => {
            let prod: IProduct = response.payload.data() as IProduct;
            prod.docId = response.payload.id;
            this.product = prod;


            let url: string = this.product!.imageUrl;
            const ref = this.storage.ref(url);
            this.profileUrl = ref.getDownloadURL();

          });

          this.getComments();
         });


    })
  }


  submitComment(commentForm: NgForm) {
    setTimeout(() => {
      let date: Date = new Date();
      let comment = {
        comment: commentForm.controls['comment'].value.toString(),
        username: this.user.username,
        date: date.toLocaleString(),
        product: this.product.docId
      } as IComment;

      this.db.collection('comment').add(comment);
    });
  }


  getComments() {
    this.db.collection('comment').snapshotChanges().subscribe((response) => {
      let comment = response.map(item => {
        let prod: IComment = item.payload.doc.data() as IComment; 
        return prod;
      });

      this.comments = comment.filter(x => x.product == this.product.docId);
    })
  }


}
