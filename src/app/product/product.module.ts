import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductViewComponent } from './product-view/product-view.component';

import { MatCardModule} from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDividerModule} from '@angular/material/divider'; 


@NgModule({
  declarations: [
    ProductViewComponent
  ],
  imports: [
    CommonModule,
    MatCardModule, 
    MatButtonModule ,
    FlexLayoutModule,
    MatDividerModule,
  ],
  exports: [ProductViewComponent]
})
export class ProductModule { }
