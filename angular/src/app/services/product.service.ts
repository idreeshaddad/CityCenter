import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDto } from '../dtos/product/product.model';
import { environment } from 'src/environments/environment.development';
import { ProductDetailsDto } from '../dtos/product/productDetails.model';
import { CreateUpdateProductDto } from '../dtos/product/createUpdateProduct.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductDto[]> {

    return this.http.get<ProductDto[]>(`${environment.apiUrl}/Products/GetProducts`);
  }

  getProduct(id: number): Observable<ProductDetailsDto> {

    return this.http.get<ProductDetailsDto>(`${environment.apiUrl}/Products/GetProduct/${id}`)
  }

  getProductForEdit(id: number): Observable<CreateUpdateProductDto> {

    return this.http.get<CreateUpdateProductDto>(`${environment.apiUrl}/Products/GetProductForEdit/${id}`)
  }
}
