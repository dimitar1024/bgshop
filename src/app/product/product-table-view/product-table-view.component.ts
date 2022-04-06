import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/IProduct';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-table-view',
  templateUrl: './product-table-view.component.html',
  styleUrls: ['./product-table-view.component.css']
})
export class ProductTableViewComponent implements OnInit {
  @Input() product?: IProduct;
  constructor(public db: AngularFirestore,public router: Router) { }

  ngOnInit(): void {
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
