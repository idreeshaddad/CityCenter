import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/enums/page-mode.enum';
import { BrandDto } from 'src/app/dtos/brands/brand.model';
import { BrandService } from 'src/app/services/brand.service';
import { NotificationMessages } from 'src/app/shared/constants/notification-messages';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-update-brand',
  templateUrl: './create-update-brand.component.html',
  styleUrls: ['./create-update-brand.component.css']
})
export class CreateUpdateBrandComponent implements OnInit {

  brandId!: number;
  pageMode: PageMode = PageMode.Create;
  form!: FormGroup;
  brand?: BrandDto;

  pageModeEnum = PageMode;

  constructor(
    private brandSvc: BrandService,
    private Router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
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
      next: (brandFromApi: BrandDto) => {
        this.form.patchValue(brandFromApi);
        this.brand = brandFromApi;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 404) {
          this.toastr.error(NotificationMessages.NotFound);
          this.Router.navigate(['/brands']);
        }
        else {
          this.toastr.error(err.message, NotificationMessages.InternalServerError);
        }

      }
    });

  }

  private createBrand() {

    this.brandSvc.createBrand(this.form.value).subscribe({
      next: () => {
        this.toastr.success(NotificationMessages.CreatedSuccessfully);
        this.Router.navigate(['/brands']);
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(err.message, NotificationMessages.InternalServerError);

      }
    });
  }

  private editBrand() {

    this.brandSvc.editBrand(this.brandId, this.form.value).subscribe({
      next: () => {
        this.toastr.success(NotificationMessages.EditedSuccessfully);
        this.Router.navigate(['/brands']);
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(err.message, NotificationMessages.InternalServerError);

      }
    });
  }

  //#endregion
}
