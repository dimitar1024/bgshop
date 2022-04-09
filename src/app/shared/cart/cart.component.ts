import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ICartItem } from 'src/app/interfaces/ICartItem';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { IOrder } from 'src/app/interfaces/IOrder';
import { IProduct } from 'src/app/interfaces/IProduct';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public cartService: CartService, public db: AngularFirestore, public router: Router, public auth : AuthService) { }
  products: IProduct[];
  user: IEmployee;
  ngOnInit(): void {
    this.user = this.auth.currentUser;
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
      });
    }
  } 


  SubmitCart()
  {
    let date: Date = new Date(); 
let prods = this.cartService.GetCart(); 
    let order = {
      date: date.toLocaleString(),
      products: prods,
      status: 1,
      username: this.user.username,
      userid: this.user.docId,
    } as IOrder;
    
    this.db.collection('order').add(order); 
    Swal.fire('Успешно записване', 'Приехме вашата поръчка!', 'success');
    this.cartService.Clear();
    this.router.navigate(['/home']) ;
     
  }
}
