import { Component, OnInit } from '@angular/core';
import { BrandService } from '../services/brand.service';
import { Brand } from '../models/brands/brand.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteBrandDialogComponent } from './delete-brand-dialog/delete-brand-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationMessages } from '../shared/constants/notification-messages';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'actions'];
  brandDS!: Brand[];

  constructor(
    private brandSvc: BrandService,
    private matDialogSvc: MatDialog,
    private matSnackbar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.loadBrands();
  }

  openDeleteDialog(brand: Brand): void {

    const dialogRef = this.matDialogSvc.open(DeleteBrandDialogComponent, {
      data: brand
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.deleteBrand(brand.id);
      }
    });
  }

  //#region Private Functions

  private loadBrands(): void {

    this.spinner.show();

    this.brandSvc.getBrands().subscribe({
      next: (brands: Brand[]) => {

        this.spinner.hide();

        this.brandDS = brands;
      }
    });
  }

  private deleteBrand(id: number): void {

    this.brandSvc.deleteBrand(id).subscribe({
      next: () => {
        this.loadBrands();
        this.matSnackbar.open(NotificationMessages.DeletedSuccessfully)
      }
    });
  }

  //#endregion


}
