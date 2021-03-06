import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module'; 

import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductModule } from './product/product.module';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatFormFieldModule} from '@angular/material/form-field';  
//import { AgmCoreModule } from '@agm/core';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './home/home.component'; 
import { SharedModule } from './shared/shared.module';
import {MatBadgeModule} from '@angular/material/badge'; 
import {MatTreeModule} from '@angular/material/tree';   
import { MatIconModule } from '@angular/material/icon';
import { CategoryComponent } from './category/category.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SearchComponent } from './search/search.component';  

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent, 
    PagenotfoundComponent, SearchComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,  
      FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore 
    AngularFireAuthModule, // auth
   // AngularFireDatabaseModule,
    AngularFireStorageModule, // storage
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    CoreModule,
    AuthModule,
    MatToolbarModule,  
    MatCardModule, 
    MatButtonModule ,
    FlexLayoutModule,
    ProductModule,
    MatGridListModule,
    MatFormFieldModule,
    SharedModule,
    MatBadgeModule ,MatTreeModule,
    MatIconModule,  
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
