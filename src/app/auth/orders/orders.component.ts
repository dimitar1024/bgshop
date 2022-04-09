import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { IOrder } from 'src/app/interfaces/IOrder';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: IOrder[];



  displayedColumns: string[] = ['first_name', 'last_name', 'username', 'actions'];
  // displayedColumns: string[] = ['first_name', 'last_name' ];
   

  constructor(public db: AngularFirestore,public cookieService: CookieService, public router: Router) {
    this.getAllOrders();
  }
  ngOnInit(): void {
  }

  getAllOrders() {
    this.db.collection('order').snapshotChanges().subscribe((response) => {
      this.orders = response.map(item => {
        let ord: IOrder = item.payload.doc.data() as IOrder; 
        ord.docId = item.payload.doc.id;
        return ord;
      }  );
    console.log(this.orders);
    })
  }

  getOrder(products:string, details: string)
  {
    this.cookieService.set('__p',products)
    this.router.navigate(['/orders/details/'+details]) ;
  }

  Sent(docid:string)
  {
    console.log(docid);
    this.db.doc('order/' + docid).update({status: 2}); 
  }
}
