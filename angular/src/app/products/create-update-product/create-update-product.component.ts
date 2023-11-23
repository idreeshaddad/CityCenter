import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/enums/pageMode.enum';
import { CreateUpdateProductDto } from 'src/app/dtos/product/createUpdateProduct.model';
import { ProductService } from 'src/app/services/product.service';
import { LookupDto } from 'src/app/dtos/lookups/lookupDto.model';
import { BrandService } from 'src/app/services/brand.service';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationMessages } from 'src/app/shared/constants/notification-messages';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrls: ['./create-update-product.component.css']
})
export class CreateUpdateProductComponent implements OnInit {

  productId!: number;
  form!: FormGroup;
  product?: CreateUpdateProductDto;

  pageMode: PageMode = PageMode.Create;
  pageModeEnum = PageMode;

  brandLookup!: LookupDto[];
  productTypeLookup!: LookupDto[];

  constructor(
    private productSvc: ProductService,
    private brandtSvc: BrandService,
    private productTypeSvc: ProductTypeService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {

    this.buildForm();

    this.loadLookups();

    this.setProductId();

    this.setPageMode();

    if (this.pageMode == PageMode.Edit) {

      this.loadProduct();
    }
  }

  submit(): void {

    if (this.form.valid) {

      if (this.pageMode == PageMode.Create) {

        this.createProduct();
      }
      else {

        this.editProduct();
      }

    }
  }

  //#region Private Functions

  private buildForm(): void {

    this.form = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      brandId: ['', Validators.required],
      productTypeId: ['', Validators.required],
    });
  }

  private setProductId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  }

  private setPageMode(): void {

    if (this.productId) {

      this.pageMode = PageMode.Edit
    }
  }

  private loadProduct(): void {

    this.productSvc.getProductForEdit(this.productId).subscribe({
      next: (productFromApi: CreateUpdateProductDto) => {

        this.form.patchValue(productFromApi);

        this.product = productFromApi;

      }
    })
  }

  private loadLookups(): void {

    this.loadProductTypeLookup();
    this.loadBrandLookup();
  }

  private loadBrandLookup() {

    this.brandtSvc.getBrandLookup().subscribe({
      next: (lookupFromApi: LookupDto[]) => {
        this.brandLookup = lookupFromApi
      }
    });
  }

  private loadProductTypeLookup() {

    this.productTypeSvc.getProductTypeLookup().subscribe({
      next: (lookupFromApi: LookupDto[]) => {
        this.productTypeLookup = lookupFromApi
      }
    });
  }

  private createProduct(): void {

    this.productSvc.createProduct(this.form.value).subscribe({
      next: () => {
        this.toastr.success(NotificationMessages.CreatedSuccessfully);
        this.router.navigate(['/products']);
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(err.message, NotificationMessages.InternalServerError);
      }
    });
  }

  private editProduct(): void {

    this.productSvc.editProduct(this.productId, this.form.value).subscribe({
      next: () => {
        this.toastr.success(NotificationMessages.CreatedSuccessfully);
        this.router.navigate(['/products']);
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(err.message, NotificationMessages.InternalServerError);
      }
    });
  }

  //#endregion

}
