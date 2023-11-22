import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/enums/pageMode.enum';
import { ProductTypeDto } from 'src/app/dtos/productTypes/productType.model';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { NotificationMessages } from 'src/app/shared/constants/notification-messages';

@Component({
  selector: 'app-create-update-product-type',
  templateUrl: './create-update-product-type.component.html',
  styleUrls: ['./create-update-product-type.component.css']
})
export class CreateUpdateProductTypeComponent implements OnInit {

  form!: FormGroup;
  productTypeId!: number;
  pageMode: PageMode = PageMode.Create;
  productType?: ProductTypeDto;

  pageModeEnum = PageMode;

  constructor(
    private productTypeSvc: ProductTypeService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private matSnackbar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.buildForm();
    this.setProductTypeId();
    this.setPageMode();

    if (this.pageMode == PageMode.Edit) {

      this.loadProductType();
    }
  }

  submit(): void {

    if (this.form.valid) {

      if (this.pageMode == PageMode.Create) {

        this.createProductType();
      }
      else {

        this.editProductType();
      }
    }
  }

  //#region Private Functions

  private buildForm(): void {

    this.form = this.fb.group({
      id: [0],
      name: ['', Validators.required]
    });
  }

  private setProductTypeId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.productTypeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  }

  private setPageMode(): void {

    if (this.productTypeId) {

      this.pageMode = PageMode.Edit
    }
  }

  private loadProductType(): void {

    this.productTypeSvc.getProductType(this.productTypeId).subscribe({
      next: (productTypeFromApi: ProductTypeDto) => {
        this.form.patchValue(productTypeFromApi);
        this.productType = productTypeFromApi;
      },
      error: (err: HttpErrorResponse) => {
        this.matSnackbar.open(err.error);
      }
    });
  }

  private createProductType(): void {

    this.productTypeSvc.createProductType(this.form.value).subscribe({
      next: () => {
        this.matSnackbar.open(NotificationMessages.CreatedSuccessfully);
        this.router.navigate(['/productTypes']);
      },
      error: (err: HttpErrorResponse) => {
        this.matSnackbar.open(err.error);
      }
    });
  }

  private editProductType(): void {

    this.productTypeSvc.editProductType(this.productTypeId, this.form.value).subscribe({
      next: () => {
        this.matSnackbar.open(NotificationMessages.EditedSuccessfully);
        this.router.navigate(['/productTypes']);
      },
      error: (err: HttpErrorResponse) => {
        this.matSnackbar.open(err.error);
      }
    });
  }

  //#endregion

}
