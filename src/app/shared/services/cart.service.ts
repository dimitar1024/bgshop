import { EventEmitter, Injectable, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ICartItem } from 'src/app/interfaces/ICartItem';
import { IProduct } from 'src/app/interfaces/IProduct';

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


  AddToCart(productid: string) {
    let prod = { docId: productid, qty: 1 } as ICartItem;

    let listStr: string = this.cookieService.get(this.cart);
    if (listStr == '') {
      let arr: ICartItem[] = [];
      arr.push(prod);
      this.getCount.emit(1);
      this.cookieService.set(this.cart, JSON.stringify(arr));

      console.log(this.cookieService.get(this.cart));
    } else {
      let obj = JSON.parse(listStr) as ICartItem[];

      let existingProd: ICartItem;
      let isExist: boolean = false;
      for (let i = 0; i < obj.length; i++) {
        if (obj[i].docId == productid) {
          existingProd = obj[i] as ICartItem;
          existingProd.qty = existingProd.qty + 1;
          obj.splice(i, 1);
          obj.push(existingProd);
          isExist = true;
        }
      }

      if (isExist == false) {
        obj.push(prod);
      }
      this.getCount.emit(obj.length);
      this.cookieService.set(this.cart, JSON.stringify(obj));
      console.log(this.cookieService.get(this.cart));
    }
  }


  RefreshItem(productid: string, qty: number) { 
    let listStr: string = this.cookieService.get(this.cart); 
    let obj = JSON.parse(listStr) as ICartItem[];

    let existingProd: ICartItem;
    let isExist: boolean = false;
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].docId == productid) {
        existingProd = obj[i] as ICartItem;
        existingProd.qty = existingProd.qty + 1;
        obj.splice(i, 1);
        obj.push(existingProd);
        isExist = true;
      }
    }

    this.getCount.emit(obj.length);
    this.cookieService.set(this.cart, JSON.stringify(obj));
    console.log(this.cookieService.get(this.cart));
  }


  Clear() {
    this.getCount.emit(0);
    this.cookieService.delete(this.cart);
  }

  GetCart(): string {
    return this.cookieService.get(this.cart);
  }

}
