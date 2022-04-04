import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductViewComponent } from './product-view/product-view.component';

import { MatCardModule} from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDividerModule} from '@angular/material/divider';
import { NewProductComponent } from './new-product/new-product.component';
import { AllProductComponent } from './all-product/all-product.component';
import { ProductTableViewComponent } from './product-table-view/product-table-view.component'; 
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    ProductViewComponent,
    NewProductComponent,
    AllProductComponent,
    ProductTableViewComponent
  ],
  imports: [
    CommonModule,
    MatCardModule, 
    MatButtonModule ,
    FlexLayoutModule,
    MatDividerModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule  ,
  ],
  exports: [ProductViewComponent]
})
export class ProductModule { }
