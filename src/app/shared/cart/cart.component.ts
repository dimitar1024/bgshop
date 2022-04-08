import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ICartItem } from 'src/app/interfaces/ICartItem';
import { IProduct } from 'src/app/interfaces/IProduct';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public cartService: CartService, public db: AngularFirestore) { }
  products: IProduct[];
  ngOnInit(): void {
    let s = this.cartService.GetCart();
    if (s != '') {
      var obj = JSON.parse(s) as ICartItem[];

      let prods: string[] = [];
      obj.forEach(element => {
        prods.push(element.docId);
      });
 
      this.db.collection('product').snapshotChanges().subscribe((response) => {
        let vals: IProduct[];
        vals = response.map(item => {
          let prod: IProduct = item.payload.doc.data() as IProduct;
          prod.docId = item.payload.doc.id;
          return prod;
        });

        this.products = vals.filter(item => prods.includes(item.docId));
        console.log(this.products);
      });
    }
  } 
}
