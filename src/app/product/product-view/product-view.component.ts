import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/IProduct';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  
  @Input() product?: IProduct;
  
  constructor() { }

  ngOnInit(): void {
  }

}
