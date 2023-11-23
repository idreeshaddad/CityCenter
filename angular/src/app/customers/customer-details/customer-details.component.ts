import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerDetailsDto } from 'src/app/dtos/customers/customer-details.model';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificationMessages } from 'src/app/shared/constants/notification-messages';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customerId!: number;
  customer?: CustomerDetailsDto;

  constructor(
    private customerSvc: CustomerService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    this.setCustomerId();
    this.loadCustomer();
  }

  //#region Private Functions

  private setCustomerId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.customerId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  }

  private loadCustomer(): void {

    this.customerSvc.getCustomer(this.customerId).subscribe({
      next: (customerFromApi: CustomerDetailsDto) => {
        this.customer = customerFromApi;
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(err.message, NotificationMessages.InternalServerError);
      }
    });
  }

  //#endregion
}
