import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandDto } from '../dtos/brands/brand.model';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { LookupDto } from '../dtos/lookups/lookupDto.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getBrands(): Observable<BrandDto[]> {

    return this.http.get<BrandDto[]>(`${environment.apiUrl}/Brands/GetBrands`);
  }

  getBrand(id: number): Observable<BrandDto> {

    return this.http.get<BrandDto>(`${environment.apiUrl}/Brands/GetBrand/${id}`);
  }

  createBrand(brand: BrandDto): Observable<any> {

    return this.http.post<BrandDto>(`${environment.apiUrl}/Brands/CreateBrand`, brand);
  }

  editBrand(id: number, brand: BrandDto): Observable<any> {

    return this.http.put<BrandDto>(`${environment.apiUrl}/Brands/EditBrand/${id}`, brand);
  }

  deleteBrand(id: number): Observable<any> {

    return this.http.delete<BrandDto>(`${environment.apiUrl}/Brands/DeleteBrand/${id}`)
  }

  getBrandLookup(): Observable<LookupDto[]> {

    return this.http.get<LookupDto[]>(`${environment.apiUrl}/Brands/GetBrandLookup`);
  }

}
