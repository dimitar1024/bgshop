import { Component } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IProduct } from './interfaces/IProduct';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
import { IEmployee } from './interfaces/IEmployee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'PROJECT';
  cookieValue: string;
  items!: IProduct[];
  empl!: IEmployee[];

  val: string = '';

  encryptSecretKey: string = '@ngu!@rT3st';
  constructor(public db: AngularFirestore, private cookieService: CookieService) {
 
    const user = {
      address: 'bla bla',
      first_name: 'Kianna',
      email: 'kianna@test.bg',
      last_name: 'Watson',
      phone: '555-444-333',
      role: 3,
    }
  
  } 
} 