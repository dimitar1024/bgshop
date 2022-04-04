import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IProduct } from '../interfaces/IProduct';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { 

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
}
