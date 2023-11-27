import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { CreateUpdateBrandComponent } from './brands/create-update-brand/create-update-brand.component';
import { ProductTypeComponent } from './product-types/product-type.component';
import { CreateUpdateProductTypeComponent } from './product-types/create-update-product-type/create-update-product-type.component';
import { CustomersComponent } from './customers/customers.component';
import { CreateUpdateCustomerComponent } from './customers/create-update-customer/create-update-customer.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { CreateUpdateProductComponent } from './products/create-update-product/create-update-product.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },

  { path: "brands", component: BrandsComponent },
  { path: "brands/create", component: CreateUpdateBrandComponent },
  { path: "brands/edit/:id", component: CreateUpdateBrandComponent },

  { path: "productTypes", component: ProductTypeComponent },
  { path: "productTypes/create", component: CreateUpdateProductTypeComponent },
  { path: "productTypes/edit/:id", component: CreateUpdateProductTypeComponent },

  { path: "customers", component: CustomersComponent },
  { path: "customers/details/:id", component: CustomerDetailsComponent },
  { path: "customers/create", component: CreateUpdateCustomerComponent },
  { path: "customers/edit/:id", component: CreateUpdateCustomerComponent },

  { path: "products", component: ProductsComponent },
  { path: "products/details/:id", component: ProductDetailsComponent },
  { path: "products/create", component: CreateUpdateProductComponent },
  { path: "products/edit/:id", component: CreateUpdateProductComponent },

  { path: "orders", component: OrdersComponent },
  { path: "orders/details/:id", component: OrderDetailsComponent },

  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
