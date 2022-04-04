import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/IProduct';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  @Input() product?: IProduct;
  isLoggedIn: boolean
  constructor(public authService: AuthService) {
    this.isLoggedIn = authService.isLoggedIn;

  }

  ngOnInit(): void {
  }

}
