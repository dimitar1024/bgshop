import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  empl: IEmployee;
  isLoggedIn: boolean
  role: number = 0;
  search: string = '';
  cartCount: number;
  def: number;



  constructor(public authService: AuthService, public router: Router, public cartService: CartService) {
    this.empl = authService.currentUser;
    this.isLoggedIn = authService.isLoggedIn;
    this.role = authService.currentUser.role;
  }


  ngOnChanges(changes: SimpleChanges): void {
  }

  onKey(event: any) { // without type info

  }

  Search() {

    if(this.search == '')
    {
      this.router.navigate(['/home']);
    }else{ 
    this.router.navigate(['/search/' + this.search]);
  }
  }

  ngOnInit(): void {
    this.authService.getIsLogged.subscribe((u) => {
      this.empl = u as IEmployee;
      this.isLoggedIn = true;
      this.role = this.empl.role;
    });

    this.cartService.getCount.subscribe((c) => {
      if(c== 0)
      {
        this.cartCount= this.def;
      }else{ 
        this.cartCount = c;
      }
    })

  }

  logout(): any {
    this.router.navigate(['/home']);
    this.authService.LogOut();
    this.isLoggedIn = false;
    this.role = 0;
  }
}
