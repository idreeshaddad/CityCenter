import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../models/brands/brand.model';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getBrands(): Observable<Brand[]> {

    return this.http.get<Brand[]>(`${environment.apiUrl}/Brands/GetBrands`);
  }

  getBrand(id: number): Observable<Brand> {

    return this.http.get<Brand>(`${environment.apiUrl}/Brands/GetBrand/${id}`);
  }

  createBrand(brand: Brand): Observable<any> {

    return this.http.post<Brand>(`${environment.apiUrl}/Brands/CreateBrand`, brand);
  }

  editBrand(id: number, brand: Brand): Observable<any> {

    return this.http.put<Brand>(`${environment.apiUrl}/Brands/EditBrand/${id}`, brand);
  }

  deleteBrand(id: number): Observable<any> {

    return this.http.delete<Brand>(`${environment.apiUrl}/Brands/DeleteBrand/${id}`)
  }

}
