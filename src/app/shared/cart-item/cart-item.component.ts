import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/interfaces/IProduct';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() product? : IProduct;
  @Input() qty : number;
  profileUrl: Observable<string | null>;
  total: number;
  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
    let url: string = this.product!.imageUrl;
    const ref = this.storage.ref(url);
    this.profileUrl = ref.getDownloadURL();
  }

  OnChange($event: any)
  {
    let val : number = $event.value;

    if(this.product!.promopercentage > 0)
    {
      let pr = this.product!.price - (this.product!.price * (this.product!.promopercentage / 100));
      this.total = pr * val;
    }else{
      this.total = this.product!.price * val;
    }

  }

}
