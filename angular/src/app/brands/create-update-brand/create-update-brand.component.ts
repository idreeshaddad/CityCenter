import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/enums/pageMode.enum';
import { Brand } from 'src/app/models/brands/brand.model';
import { BrandService } from 'src/app/services/brand.service';
import { NotificationMessages } from 'src/app/shared/constants/notification-messages';

@Component({
  selector: 'app-create-update-brand',
  templateUrl: './create-update-brand.component.html',
  styleUrls: ['./create-update-brand.component.css']
})
export class CreateUpdateBrandComponent implements OnInit {

  brandId!: number;
  pageMode: PageMode = PageMode.Create;
  form!: FormGroup;
  brand!: Brand;

  pageModeEnum = PageMode;

  constructor(
    private brandSvc: BrandService,
    private Router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.setBrandId();
    this.setPageMode();

    this.buildForm();

    if (this.pageMode == PageMode.Edit) {
      this.loadBrand();
    }
  }

  submitForm(): void {

    if (this.form.valid) {

      if (this.pageMode === PageMode.Create) {
        this.brand = this.form.value;
        this.createBrand();
      }
      else {
        this.editBrand();
      }
    }
  }

  //#region Private Functions

  private setBrandId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.brandId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  }

  private setPageMode(): void {

    if (this.brandId) {
      this.pageMode = PageMode.Edit;
    }
  }

  private buildForm(): void {

    this.form = this.fb.group({
      id: [0],
      name: ['', Validators.required]
    });
  }

  private loadBrand() {

    this.brandSvc.getBrand(this.brandId).subscribe({
      next: (brandFromApi: Brand) => {
        this.form.patchValue(brandFromApi);
        this.brand = brandFromApi;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 404) {
          this.snackBar.open(NotificationMessages.NotFound);
          this.Router.navigate(['/brands']);
        }
        else {
          this.snackBar.open(NotificationMessages.InternalServerError, "Ok", {
            duration: 0
          });
        }

      }
    });

  }

  private createBrand() {

    this.brandSvc.createBrand(this.form.value).subscribe({
      next: () => {
        this.snackBar.open(NotificationMessages.CreatedSuccessfully);
        this.Router.navigate(['/brands']);
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(NotificationMessages.InternalServerError);
      }
    });
  }

  private editBrand() {

    this.brandSvc.editBrand(this.brandId, this.form.value).subscribe({
      next: () => {
        this.snackBar.open(NotificationMessages.EditedSuccessfully);
        this.Router.navigate(['/brands']);
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(NotificationMessages.InternalServerError);
      }
    });
  }

  //#endregion
}
