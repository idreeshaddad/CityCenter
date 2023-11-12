import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Brand } from 'src/app/models/brands/brand.model';

@Component({
  selector: 'app-delete-brand-dialog',
  templateUrl: './delete-brand-dialog.component.html',
  styles: []
})
export class DeleteBrandDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteBrandDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public brandData: Brand,
  ) { }



}
