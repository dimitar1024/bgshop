import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/interfaces/IProduct';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-table-view',
  templateUrl: './product-table-view.component.html',
  styleUrls: ['./product-table-view.component.css']
})
export class ProductTableViewComponent implements OnInit {
  @Input() product?: IProduct;
  profileUrl: Observable<string | null>;
  constructor(public db: AngularFirestore,public router: Router,private storage: AngularFireStorage) { }

  ngOnInit(): void {
    let url: string = this.product!.imageUrl;
    const ref = this.storage.ref(url);
    this.profileUrl = ref.getDownloadURL();
  }
  
  deleteProduct(docId:string) { 
    Swal.fire({
      title: 'Сигурни ли сте че искате да изтриете този продукт',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Да',
      cancelButtonText: 'Не'
    }).then((result) => {
      if (result.value) {
        this.db.collection('product').doc(docId).delete();
        Swal.fire(
          'Изтрит!',
          'Успешно изтрихте продукта',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })


  }

  openProduct(docId:string) { 
    this.router.navigate(['/products/' + docId]) ;
  }
}
