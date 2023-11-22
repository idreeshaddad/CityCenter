import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductDetailsDto } from 'src/app/dtos/product/productDetails.model';
import { ProductService } from 'src/app/services/product.service';
import { NotificationMessages } from 'src/app/shared/constants/notification-messages';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId!: number;
  product?: ProductDetailsDto;

  constructor(
    private productSvc: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.setProductId();
    this.loadProduct();
  }

  //#region Private Functions

  private setProductId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  }

  private loadProduct(): void {

    this.productSvc.getProduct(this.productId).subscribe({
      next: (productDetailsFromApi: ProductDetailsDto) => {
        this.product = productDetailsFromApi;
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(`${NotificationMessages.InternalServerError}: ${err.message}`);
      }
    });
  }

  //#endregion
}
