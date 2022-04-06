import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { AllOrdersComponent } from './order/all-orders/all-orders.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AllProductComponent } from './product/all-product/all-product.component'; 
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { NewProductComponent } from './product/new-product/new-product.component';
import { SearchComponent } from './search/search.component';
import { EmployeeGuard } from './shared/guards/employee.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products',canActivate: [EmployeeGuard], component: AllProductComponent },
  { path: 'products/new', canActivate: [EmployeeGuard],component: NewProductComponent },
  { path: 'products/:id', canActivate: [EmployeeGuard],component: EditProductComponent },
  { path: 'orders', canActivate: [EmployeeGuard],component: AllOrdersComponent },
  {  path: 'category/', component: CategoryComponent},
  {  path: 'category/:id', component: CategoryComponent},
  {  path: 'search/:id', component: SearchComponent},
 // {  path: '**', component: PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
