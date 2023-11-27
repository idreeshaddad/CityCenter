import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CreateUpdateBrandComponent } from './brands/create-update-brand/create-update-brand.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteBrandDialogComponent } from './brands/delete-brand-dialog/delete-brand-dialog.component';
import { ProductTypeComponent } from './product-types/product-type.component';
import { DeleteProductTypeDialogComponent } from './product-types/delete-product-type-dialog/delete-product-type-dialog.component';
import { CreateUpdateProductTypeComponent } from './product-types/create-update-product-type/create-update-product-type.component';
import { CustomersComponent } from './customers/customers.component';
import { CreateUpdateCustomerComponent } from './customers/create-update-customer/create-update-customer.component';
import { DeleteCustomerDialogComponent } from './customers/delete-customer-dialog/delete-customer-dialog.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { CreateUpdateProductComponent } from './products/create-update-product/create-update-product.component';
import { DeleteProductDialogComponent } from './products/delete-product-dialog/delete-product-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrandsComponent,
    CreateUpdateBrandComponent,
    DeleteBrandDialogComponent,
    ProductTypeComponent,
    DeleteProductTypeDialogComponent,
    CreateUpdateProductTypeComponent,
    CustomersComponent,
    CreateUpdateCustomerComponent,
    DeleteCustomerDialogComponent,
    CustomerDetailsComponent,
    ProductsComponent,
    ProductDetailsComponent,
    CreateUpdateProductComponent,
    DeleteProductDialogComponent,
    OrdersComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
