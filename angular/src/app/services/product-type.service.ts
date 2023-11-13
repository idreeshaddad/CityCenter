import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { ProductType } from '../models/productTypes/productType.model';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  constructor(private http: HttpClient) { }

  getProductTypes(): Observable<ProductType[]> {

    return this.http.get<ProductType[]>(`${environment.apiUrl}/ProductTypes/GetProductTypes`);
  }

  getProductType(id: number): Observable<ProductType> {

    return this.http.get<ProductType>(`${environment.apiUrl}/ProductTypes/GetProductType/${id}`);
  }

  createProductType(productType: ProductType): Observable<any> {

    return this.http.post<ProductType>(`${environment.apiUrl}/ProductTypes/CreateProductType`, productType);
  }

  editProductType(id: number, productType: ProductType): Observable<any> {

    return this.http.put<ProductType>(`${environment.apiUrl}/ProductTypes/EditProductType/${id}`, productType);
  }

  deleteProductType(id: number): Observable<any> {

    return this.http.delete<ProductType>(`${environment.apiUrl}/ProductTypes/DeleteProductType/${id}`)
  }

}
