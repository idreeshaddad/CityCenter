import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product/product.model';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NotificationMessages } from '../shared/constants/notification-messages';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productSvc: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.loadProducts();
  }

  //#region Private Functions

  private loadProducts(): void {

    this.productSvc.getProducts().subscribe({
      next: (productsFromApi: Product[]) => {
        this.products = productsFromApi;
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(`${NotificationMessages.InternalServerError}: ${err.message}`);
      }
    });
  }

  //#region

}
