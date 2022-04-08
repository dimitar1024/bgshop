import { EventEmitter, Injectable, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ICartItem } from 'src/app/interfaces/ICartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private cookieService: CookieService) { }

  @Output() getCount: EventEmitter<any> = new EventEmitter();
  encryptSecretKey: string = 'C@rtS3rv!ce';
  cart: string = '_cart';

  encryptData(data: string): string {

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


  AddToCart(productid: string, qty: number) { 
    let prod = { docId: productid, qty: qty } as ICartItem;
     
    let listStr: string = this.cookieService.get(this.cart);
    if (listStr == '') {
      let arr: ICartItem[] = [];
      arr.push(prod);
      this.getCount.emit(1);
      this.cookieService.set(this.cart,JSON.stringify(arr)); 

     console.log(this.cookieService.get(this.cart));
    }else{
      var obj = JSON.parse(listStr); 
      obj.push(prod);
      this.getCount.emit(obj.length);
      this.cookieService.set(this.cart,JSON.stringify(obj)); 
      console.log(this.cookieService.get(this.cart));
    }
  } 
  Clear() {
    this.cookieService.delete(this.cart);
  }

  GetCart() : string
  {
    return this.cookieService.get(this.cart); 
  }

}
