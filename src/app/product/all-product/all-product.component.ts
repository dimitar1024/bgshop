import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IProduct } from 'src/app/interfaces/IProduct';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {

  constructor(public db: AngularFirestore) {
this.getAllProducts();
  }

  products: IProduct[];
  ngOnInit(): void {
  }


  getAllProducts() {
    this.db.collection('product').snapshotChanges().subscribe((response) => {
      this.products = response.map(item => {
        let prod: IProduct = item.payload.doc.data() as IProduct;
        prod.docId = item.payload.doc.id;
        return prod;
      }
      );
    })
  }

  deleteProduct(docId:string) {
    if (confirm('Delete?')) {
      this.db.collection('product').doc(docId).delete();

    }
  }
}
