import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/interfaces/IProduct';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  @Input() product?: IProduct;
  profileUrl: Observable<string | null>;

  isLoggedIn: boolean
  constructor(public authService: AuthService,public router: Router, private storage: AngularFireStorage, public cartService: CartService) {
    this.isLoggedIn = authService.isLoggedIn;

  }

  ngOnInit(): void {
    let url: string = this.product!.imageUrl;
    const ref = this.storage.ref(url);
    this.profileUrl = ref.getDownloadURL();

    this.authService.getIsLogged.subscribe((u) => {
      this.isLoggedIn = true;
    });

  }

  addToCart(prodid: any): void {
    this.cartService.AddToCart(prodid);
  }


  openPRoduct(prodid: any) :void{
    this.router.navigate(['/products/details/' + prodid]) ;
  }

}
