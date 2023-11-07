import { Component, OnInit } from '@angular/core';
import { BrandService } from '../services/brand.service';
import { Brand } from '../models/brands/brand.model';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name'];
  brandDS!: Brand[];

  constructor(
    private brandSvc: BrandService) { }

  ngOnInit(): void {

    this.loadBrands();
  }

  //#region Private Functions

  private loadBrands(): void {

    this.brandSvc.getBrands().subscribe({
      next: (brands: Brand[]) => {
        this.brandDS = brands;
      }
    });
  }


  //#endregion


}
