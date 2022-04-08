import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon';  
 import {MatGridListModule} from '@angular/material/grid-list'; 
 import {MatFormFieldModule} from '@angular/material/form-field'; 
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge'; 

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,    

  ],
  imports: [
    CommonModule, 
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    MatBadgeModule
  ],
  exports:[  HeaderComponent,
    FooterComponent]
})
export class CoreModule {  }
