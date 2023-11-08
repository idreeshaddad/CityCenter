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
}
