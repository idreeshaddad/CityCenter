import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationMessages } from '../shared/constants/notification-messages';
import { ProductTypeService } from '../services/product-type.service';
import { ProductTypeDto } from '../dtos/productTypes/productType.model';
import { DeleteProductTypeDialogComponent } from './delete-product-type-dialog/delete-product-type-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styles: []
})
export class ProductTypeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'actions'];
  productTypeDS!: ProductTypeDto[];

  constructor(
    private productTypeSvc: ProductTypeService,
    private matDialogSvc: MatDialog,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.loadProductTypes();
  }

  openDeleteDialog(productType: ProductTypeDto): void {

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

    this.spinner.show();

    this.productTypeSvc.getProductTypes().subscribe({
      next: (productTypes: ProductTypeDto[]) => {

        this.spinner.hide();

        this.productTypeDS = productTypes;
      }
    });
  }

  private deleteProductType(id: number): void {

    this.productTypeSvc.deleteProductType(id).subscribe({
      next: () => {
        this.loadProductTypes();
        this.toastr.success(NotificationMessages.DeletedSuccessfully);
      }
    });
  }

  //#endregion


}

