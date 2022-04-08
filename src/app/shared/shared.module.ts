import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { CartComponent } from './cart/cart.component';  
import { CartItemComponent } from './cart-item/cart-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select'; 


@NgModule({
  declarations: [
    LoadingComponent,
    CartComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore 
    AngularFireAuthModule, // auth 
    AngularFireStorageModule, // storage    
    MatCardModule  ,
    MatFormFieldModule,
    FormsModule,MatSelectModule
  ], 
  exports: [LoadingComponent]
})
export class SharedModule { }
