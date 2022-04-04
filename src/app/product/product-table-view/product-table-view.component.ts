import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IProduct } from 'src/app/interfaces/IProduct';

@Component({
  selector: 'app-product-table-view',
  templateUrl: './product-table-view.component.html',
  styleUrls: ['./product-table-view.component.css']
})
export class ProductTableViewComponent implements OnInit {
  @Input() product?: IProduct;
  constructor(public db: AngularFirestore) { }

  ngOnInit(): void {
  }
  
  deleteProduct(docId:string) {
    if (confirm('Delete?')) {
      this.db.collection('product').doc(docId).delete();

    }
  }
}
