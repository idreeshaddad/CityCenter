import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationMessages } from '../shared/constants/notification-messages';
import { ProductTypeService } from '../services/product-type.service';
import { ProductType } from '../models/productTypes/productType.model';
import { DeleteProductTypeDialogComponent } from './delete-product-type-dialog/delete-product-type-dialog.component';


@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styles: []
})
export class ProductTypeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'actions'];
  productTypeDS!: ProductType[];

  constructor(
    private productTypeSvc: ProductTypeService,
    private matDialogSvc: MatDialog,
    private matSnackbar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.loadProductTypes();
  }

  openDeleteDialog(productType: ProductType): void {

    const dialogRef = this.matDialogSvc.open(DeleteProductTypeDialogComponent, {
      data: productType
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.deleteProductType(productType.id);
      }
    });
  }

  //#region Private Functions

  private loadProductTypes(): void {

    this.productTypeSvc.getProductTypes().subscribe({
      next: (productTypes: ProductType[]) => {
        this.productTypeDS = productTypes;
      }
    });
  }

  private deleteProductType(id: number): void {

    this.productTypeSvc.deleteProductType(id).subscribe({
      next: () => {
        this.loadProductTypes();
        this.matSnackbar.open(NotificationMessages.DeletedSuccessfully)
      }
    });
  }

  //#endregion


}

