import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/interfaces/IProduct';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  @Input() product?: IProduct;
  profileUrl: Observable<string | null>;
  
  isLoggedIn: boolean
  constructor(public authService: AuthService, private storage: AngularFireStorage) {
    this.isLoggedIn = authService.isLoggedIn;

  }

  ngOnInit(): void { 
    let url : string  =this.product!.imageUrl;
    const ref = this.storage.ref(url);  
    this.profileUrl = ref.getDownloadURL();
  }

}
