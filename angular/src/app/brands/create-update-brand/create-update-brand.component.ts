import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/enums/pageMode.enum';
import { Brand } from 'src/app/models/brands/brand.model';
import { BrandService } from 'src/app/services/brand.service';

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
          this.snackBar.open("404 No such brand exist.");
          this.Router.navigate(['/brands']);
        }
        else {
          this.snackBar.open("Internal Server Error. Please Contact the Administrator", "Ok", {
            duration: 0
          });
        }

      }
    });

  }

  //#endregion
}
