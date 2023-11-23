import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { CustomerDto } from '../dtos/customers/customer.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCustomerDialogComponent } from './delete-customer-dialog/delete-customer-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationMessages } from '../shared/constants/notification-messages';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'fullName', 'age', 'phoneNumber', 'actions'];
  customerDS!: CustomerDto[];

  constructor(
    private customerSvc: CustomerService,
    private matDialogSvc: MatDialog,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.loadCustomers();
  }

  openDeleteDialog(customer: CustomerDto): void {

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
      next: (customers: CustomerDto[]) => {

        this.spinner.hide();

        this.customerDS = customers;
      }
    });
  }

  private deleteCustomer(id: number): void {

    this.customerSvc.deleteCustomer(id).subscribe({
      next: () => {
        this.loadCustomers();
        this.toastr.success(NotificationMessages.DeletedSuccessfully);
      }
    });
  }

  //#endregion


}
