import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CookieService } from 'ngx-cookie-service';
import { ICartItem } from 'src/app/interfaces/ICartItem';
import { ICartProduct } from 'src/app/interfaces/ICartProduct';
import { IProduct } from 'src/app/interfaces/IProduct';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {
  products: ICartProduct[];
  constructor(public cookieService: CookieService, public db: AngularFirestore) { }
  total: number = 0;
  ngOnInit(): void {

    let s = this.cookieService.get('__p');
    if (s != '') { 
      var obj = JSON.parse(s) as ICartItem[]; 
      let prods: string[] = [];
      obj.forEach(element => {
        prods.push(element.docId);
      }); 

      this.db.collection('product').snapshotChanges().subscribe((response) => {
        let vals: ICartProduct[];
        vals = response.map(item => {
          let prod: ICartProduct = item.payload.doc.data() as ICartProduct;
          prod.docId = item.payload.doc.id;
          return prod;
        });
        vals = vals.filter(item => prods.includes(item.docId)); 
        for (let i = 0; i < vals.length; i++) {
          for (let f = 0; f < obj.length; f++) {

            if (vals[i].docId == obj[f].docId) {  
              vals[i].qty = obj[f].qty;
            }
          }
        }

        for (let i = 0; i < vals.length; i++) {
          this.total += vals[i].price * vals[i].qty; 
        }

        this.products = vals;
      });
    }
  }

}
