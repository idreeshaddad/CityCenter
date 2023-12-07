import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { LookupDto } from '../dtos/lookups/lookupDto.model';
import { AddToCartDto } from '../dtos/product/addToCartDto.model';
import { CartDto } from '../dtos/cart/Cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addToCart(addToCartDto: AddToCartDto): Observable<any> {

    return this.http.post<any>(`${environment.apiUrl}/Cart/AddToCart`, addToCartDto);
  }


  getCart(): Observable<CartDto> {

    return this.http.get<CartDto>(`${environment.apiUrl}/Cart/GetCart`);
  }

  checkOut(cart: CartDto): Observable<any> {

    return this.http.post<CartDto>(`${environment.apiUrl}/Cart/CheckOut`, cart)
  }

}
