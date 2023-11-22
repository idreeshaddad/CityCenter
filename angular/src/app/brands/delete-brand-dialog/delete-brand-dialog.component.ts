import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrandDto } from 'src/app/dtos/brands/brand.model';

@Component({
  selector: 'app-delete-brand-dialog',
  templateUrl: './delete-brand-dialog.component.html',
  styles: []
})
export class DeleteBrandDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteBrandDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public brandData: BrandDto,
  ) { }



}
