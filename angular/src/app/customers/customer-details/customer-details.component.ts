import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CustomerDetails } from 'src/app/models/customers/customer-details.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customerId!: number;
  customer?: CustomerDetails;

  constructor(
    private customerSvc: CustomerService,
    private activatedRoute: ActivatedRoute,
    private matSnackbar: MatSnackBar
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
      next: (customerFromApi: CustomerDetails) => {
        this.customer = customerFromApi;
      },
      error: (err: HttpErrorResponse) => {
        this.matSnackbar.open(err.message);
      }
    });
  }

  //#endregion
}
