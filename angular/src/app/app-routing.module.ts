import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { CreateUpdateBrandComponent } from './brands/create-update-brand/create-update-brand.component';
import { ProductTypeComponent } from './product-types/product-type.component';
import { CreateUpdateProductTypeComponent } from './product-types/create-update-product-type/create-update-product-type.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },

  { path: "brands", component: BrandsComponent },
  { path: "brands/create", component: CreateUpdateBrandComponent },
  { path: "brands/edit/:id", component: CreateUpdateBrandComponent },

  { path: "productTypes", component: ProductTypeComponent },
  { path: "productTypes/create", component: CreateUpdateProductTypeComponent },
  { path: "productTypes/edit/:id", component: CreateUpdateProductTypeComponent },


  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
