import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductType } from 'src/app/models/productTypes/productType.model';

@Component({
  selector: 'app-delete-product-type-dialog',
  templateUrl: './delete-product-type-dialog.component.html',
  styles: [
  ]
})
export class DeleteProductTypeDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteProductTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public productTypeData: ProductType,
  ) { }

}
