import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { OrderdetailsComponent } from './auth/orderdetails/orderdetails.component';
import { OrdersComponent } from './auth/orders/orders.component';
import { ProfileComponent } from './auth/profile/profile.component'; 
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component'; 
import { AllProductComponent } from './product/all-product/all-product.component';
import { DetailsComponent } from './product/details/details.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { NewProductComponent } from './product/new-product/new-product.component';
import { PromotionsComponent } from './product/promotions/promotions.component';
import { SearchComponent } from './search/search.component';
import { CartComponent } from './shared/cart/cart.component'; 
import { EmployeeGuard } from './shared/guards/employee.guard'; 
import { UserGuard } from './shared/guards/user.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', canActivate: [EmployeeGuard], component: AllProductComponent },
  { path: 'products/new', canActivate: [EmployeeGuard], component: NewProductComponent },
  { path: 'products/:id', canActivate: [EmployeeGuard], component: EditProductComponent },
  { path: 'products/details/:id', component: DetailsComponent },
  { path: 'orders', canActivate: [EmployeeGuard], component: OrdersComponent },
  { path: 'orders/details/:id', canActivate: [UserGuard], component: OrderdetailsComponent },
  { path: 'category/', component: CategoryComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'search/:id', component: SearchComponent },
  { path: 'promotions', component: PromotionsComponent },
  { path: 'cart', component: CartComponent }, 
  { path: 'profile/:id',  canActivate: [UserGuard], component: ProfileComponent }
  // {  path: '**', component: PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
