import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../dtos/product/product.model';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NotificationMessages } from '../shared/constants/notification-messages';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: ProductDto[] = [];

  constructor(
    private productSvc: ProductService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.loadProducts();
  }

  openDeleteDialog(product: ProductDto): void {
    throw new Error('Method not implemented.');
  }

  //#region Private Functions

  private loadProducts(): void {

    this.spinner.show();

    this.productSvc.getProducts().subscribe({
      next: (productsFromApi: ProductDto[]) => {
        this.products = productsFromApi;

        this.spinner.hide();
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(`${NotificationMessages.InternalServerError}: ${err.message}`);
      }
    });
  }

  //#region

}
