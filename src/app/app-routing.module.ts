import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllOrdersComponent } from './order/all-orders/all-orders.component';
import { AllProductComponent } from './product/all-product/all-product.component';
import { NewProductComponent } from './product/new-product/new-product.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: AllProductComponent },
  { path: 'products/new', component: NewProductComponent },
  { path: 'orders', component: AllOrdersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
