import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { EmployeesComponent } from './employees/employees.component';
import {MatTableModule} from '@angular/material/table'; 
import { SharedModule } from '../shared/shared.module';
import { UserGuard } from '../shared/guards/user.guard';
import { AdminGuard } from '../shared/guards/admin.guard';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, 
  { path: 'admin/employee/new', canActivate: [AdminGuard],component: NewEmployeeComponent },
  { path: 'admin/employees',canActivate: [AdminGuard], component: EmployeesComponent }, 
  { path: 'profile/:id',  canActivate: [UserGuard], component: ProfileComponent }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NewEmployeeComponent,
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    SharedModule

  ],
  exports: [RouterModule]
})
export class AuthModule { }
