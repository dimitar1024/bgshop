import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  user: IEmployee;
  constructor(public db: AngularFirestore, authService: AuthService) {
    this.user = authService.currentUser; 
  }


 




}
