import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/interfaces/IProduct';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() product?: IProduct;
  @Input() isReadOnly: boolean;
  @Input() qty: number;
  profileUrl: Observable<string | null>;
  total: number;

  selected: string = "1";
  constructor(private storage: AngularFireStorage, public cartService: CartService) { }

  ngOnInit(): void {
    let url: string = this.product!.imageUrl;
    const ref = this.storage.ref(url);
    this.selected = "1";
    this.profileUrl = ref.getDownloadURL();


    if (this.product!.promopercentage > 0) {
      let pr = this.product!.price - (this.product!.price * (this.product!.promopercentage / 100));
      this.total = pr * this.qty;
    } else {
      this.total = this.product!.price * this.qty;
    }


  }

  OnChange($event: any) {
    let val: number = $event.value;

    if (this.product!.promopercentage > 0) {
      let pr = this.product!.price - (this.product!.price * (this.product!.promopercentage / 100));
      this.total = pr * val;
    } else {
      this.total = this.product!.price * val;
    }

    this.cartService.RefreshItem(this.product!.docId, val);  
  }
}
