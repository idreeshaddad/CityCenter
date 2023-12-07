import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDto } from '../dtos/product/product.model';
import { environment } from 'src/environments/environment.development';
import { ProductDetailsDto } from '../dtos/product/productDetails.model';
import { CreateUpdateProductDto } from '../dtos/product/createUpdateProduct.model';
import { LookupDto } from '../dtos/lookups/lookupDto.model';
import { AddToCartDto } from '../dtos/product/addToCartDto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductDto[]> {

    return this.http.get<ProductDto[]>(`${environment.apiUrl}/Products/GetProducts`);
  }

  getProduct(id: number): Observable<ProductDetailsDto> {

    return this.http.get<ProductDetailsDto>(`${environment.apiUrl}/Products/GetProduct/${id}`);
  }

  getProductForEdit(id: number): Observable<CreateUpdateProductDto> {

    return this.http.get<CreateUpdateProductDto>(`${environment.apiUrl}/Products/GetProductForEdit/${id}`);
  }

  createProduct(product: CreateUpdateProductDto): Observable<any> {

    return this.http.post<CreateUpdateProductDto>(`${environment.apiUrl}/Products/CreateProduct`, product);
  }

  editProduct(id: number, product: CreateUpdateProductDto): Observable<any> {

    return this.http.put<CreateUpdateProductDto>(`${environment.apiUrl}/Products/EditProduct/${id}`, product);
  }

  getProductLookup(): Observable<LookupDto[]> {

    return this.http.get<LookupDto[]>(`${environment.apiUrl}/Products/GetProductLookup`);
  }

}
