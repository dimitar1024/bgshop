import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/interfaces/IProduct';
import { FileuploadService } from 'src/app/shared/services/fileupload.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(public db: AngularFirestore, public router: Router, 
    private activatedRoute: ActivatedRoute,  public storage :AngularFireStorage ) { }

  profileUrl: Observable<string | null>;
   product : IProduct;

  ngOnInit(): void { 

    this.activatedRoute.params.subscribe(params => {
      const id: string = params['id']; 
      this.db.collection('product').doc(id).snapshotChanges()
        .subscribe((response) => {
          let prod : IProduct = response.payload.data() as IProduct;
          this.product = prod; 
          
    let url: string = this.product!.imageUrl;
    const ref = this.storage.ref(url);
    this.profileUrl = ref.getDownloadURL();

        });

    })
  }

}
