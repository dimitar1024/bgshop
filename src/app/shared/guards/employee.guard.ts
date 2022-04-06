import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}
  
  canActivate(): boolean | UrlTree { 
    if (this.authService.currentUser.role == 2) {
      return true;
    }

    return this.router.createUrlTree(['/home'])
  }
  
}
