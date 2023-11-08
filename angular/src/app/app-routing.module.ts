import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { CreateUpdateBrandComponent } from './brands/create-update-brand/create-update-brand.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },

  { path: "brands", component: BrandsComponent },
  { path: "brands/create", component: CreateUpdateBrandComponent },
  { path: "brands/edit/:id", component: CreateUpdateBrandComponent },


  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
