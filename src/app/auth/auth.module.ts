import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';  
 import {MatButtonModule} from '@angular/material/button'; 
 import {MatInputModule} from '@angular/material/input';  
import { FormsModule } from '@angular/forms';

const routes: Routes = [ 
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },  
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule  ,

  ],
  exports: [RouterModule]
})
export class AuthModule { }
