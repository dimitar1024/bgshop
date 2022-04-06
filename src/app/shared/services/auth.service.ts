import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import {  map, Observable } from 'rxjs'; 
import { IProduct } from '../../interfaces/IProduct';
import { CookieService } from 'ngx-cookie-service'; 
import * as CryptoJS from 'crypto-js'; 
import { IEmployee } from '../../interfaces/IEmployee';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  encryptSecretKey : string = '@ngu!@rT3st';
  empl :IEmployee[];

  constructor(public db: AngularFirestore,  private cookieService: CookieService) { 

 //this.LogIn('sysadmin@test.bg','123456')

  }
 
  LogIn(email: string, password: string) {
    this.db.collection('user', ref => ref.where('email', '==', email).where('password', '==', password).limit(1)).snapshotChanges()
      .subscribe((response) => {
        if (response.length > 0) {
          this.empl = response.map(item => {
            let emp = item.payload.doc.data() as IEmployee;
            let val = this.encryptData(emp);
            this.cookieService.set('_u', val); 
            return emp;
          }
          );
        }
      });
  }

  LogOut()
  {
    this.cookieService.delete('_u'); 
  }

  encryptData(data: IEmployee): string {

    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    } catch (e) {
      console.log(e);
      return '';
    }
  }

  decryptData(data: string) {

    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
 
  get isLoggedIn(): boolean {
    let val = this.cookieService.get('_u');
    if (val != '') {
      let test: IEmployee = this.decryptData(val) as IEmployee; 
      return true;
    }
    else {
      return false;
    }
  }
 
  get currentUser(): IEmployee {
    let val = this.cookieService.get('_u');
    let empl: IEmployee = this.decryptData(val) as IEmployee;
    return empl;
  } 
}
