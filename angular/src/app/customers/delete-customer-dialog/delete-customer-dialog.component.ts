import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerDto } from 'src/app/dtos/customers/customer.model';

@Component({
  selector: 'app-delete-customer-dialog',
  templateUrl: './delete-customer-dialog.component.html',
  styles: [
  ]
})
export class DeleteCustomerDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public customer: CustomerDto,
  ) { }

}
