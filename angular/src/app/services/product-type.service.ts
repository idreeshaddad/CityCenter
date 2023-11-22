import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { ProductTypeDto } from '../dtos/productTypes/productType.model';
import { LookupDto } from '../dtos/lookups/lookupDto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  constructor(private http: HttpClient) { }

  getProductTypes(): Observable<ProductTypeDto[]> {

    return this.http.get<ProductTypeDto[]>(`${environment.apiUrl}/ProductTypes/GetProductTypes`);
  }

  getProductType(id: number): Observable<ProductTypeDto> {

    return this.http.get<ProductTypeDto>(`${environment.apiUrl}/ProductTypes/GetProductType/${id}`);
  }

  createProductType(productType: ProductTypeDto): Observable<any> {

    return this.http.post<ProductTypeDto>(`${environment.apiUrl}/ProductTypes/CreateProductType`, productType);
  }

  editProductType(id: number, productType: ProductTypeDto): Observable<any> {

    return this.http.put<ProductTypeDto>(`${environment.apiUrl}/ProductTypes/EditProductType/${id}`, productType);
  }

  deleteProductType(id: number): Observable<any> {

    return this.http.delete<ProductTypeDto>(`${environment.apiUrl}/ProductTypes/DeleteProductType/${id}`)
  }

  getProductTypeLookup(): Observable<LookupDto[]> {

    return this.http.get<LookupDto[]>(`${environment.apiUrl}/ProductTypes/GetProductTypeLookup`);
  }

}
