import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customers/customer.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCustomerDialogComponent } from './delete-customer-dialog/delete-customer-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationMessages } from '../shared/constants/notification-messages';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'fullName', 'age', 'phoneNumber', 'actions'];
  customerDS!: Customer[];

  constructor(
    private customerSvc: CustomerService,
    private matDialogSvc: MatDialog,
    private matSnackbar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.loadCustomers();
  }

  openDeleteDialog(customer: Customer): void {

    const dialogRef = this.matDialogSvc.open(DeleteCustomerDialogComponent, {
      data: customer
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.deleteCustomer(customer.id);
      }
    });
  }

  //#region Private Functions

  private loadCustomers(): void {

    this.spinner.show();

    this.customerSvc.getCustomers().subscribe({
      next: (customers: Customer[]) => {

        this.spinner.hide();

        this.customerDS = customers;
      }
    });
  }

  private deleteCustomer(id: number): void {

    this.customerSvc.deleteCustomer(id).subscribe({
      next: () => {
        this.loadCustomers();
        this.matSnackbar.open(NotificationMessages.DeletedSuccessfully)
      }
    });
  }

  //#endregion


}
