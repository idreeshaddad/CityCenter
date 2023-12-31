import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/enums/page-mode.enum';
import { CreateUpdateCustomerDto } from 'src/app/dtos/customers/create-update-customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificationMessages } from 'src/app/shared/constants/notification-messages';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-update-customer',
  templateUrl: './create-update-customer.component.html',
  styleUrls: ['./create-update-customer.component.css']
})
export class CreateUpdateCustomerComponent implements OnInit {

  customerId!: number;
  customer?: CreateUpdateCustomerDto;
  form!: FormGroup;

  pageMode: PageMode = PageMode.Create;
  pageModeEnum = PageMode;

  constructor(
    private customerSvc: CustomerService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.buildForm();
    this.setCustomerId();
    this.setPageMode();

    if (this.pageMode == PageMode.Edit) {

      this.loadCustomer();
    }
  }

  submit(): void {

    console.log(this.form.value);
    if (this.form.valid) {

      if (this.pageMode == PageMode.Create) {
        this.createCustomer();
      }
      else {
        this.editCustomer();
      }
    }
  }

  //#region Private Functions

  private buildForm(): void {

    this.form = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  private setCustomerId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.customerId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  }

  private setPageMode(): void {

    if (this.customerId) {

      this.pageMode = PageMode.Edit;
    }
  }

  private loadCustomer(): void {

    this.customerSvc.getCustomerForEdit(this.customerId).subscribe({
      next: (customerFromApi: CreateUpdateCustomerDto) => {
        this.form.patchValue(customerFromApi);
        this.customer = customerFromApi;
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(err.message, NotificationMessages.InternalServerError);

      }
    });
  }

  private createCustomer(): void {

    this.customerSvc.createCustomer(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/customers']);
        this.toastr.success(NotificationMessages.CreatedSuccessfully);
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(err.message, NotificationMessages.InternalServerError);
      }

    });
  }

  private editCustomer(): void {

    this.customerSvc.editCustomer(this.customerId, this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/customers']);
        this.toastr.success(NotificationMessages.EditedSuccessfully);
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(err.message, NotificationMessages.InternalServerError);
      }

    });
  }

  //#endregion
}
