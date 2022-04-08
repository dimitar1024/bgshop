import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interfaces/IProduct';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  products: IProduct[];
  constructor(public db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('product').snapshotChanges().subscribe((response) => {
      let vals: IProduct[];
      vals = response.map(item => {
        let prod: IProduct = item.payload.doc.data() as IProduct;
        prod.docId = item.payload.doc.id;
        return prod;
      });

      this.products = vals.filter(d => d.promopercentage > 0);
    });
  }

}
