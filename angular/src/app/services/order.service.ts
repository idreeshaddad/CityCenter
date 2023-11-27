import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDto } from '../dtos/orders/order.dto';
import { environment } from 'src/environments/environment';
import { OrderDetailsDto } from '../dtos/orders/order-details.dto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<OrderDto[]> {

    return this.http.get<OrderDto[]>(`${environment.apiUrl}/Orders/GetOrders`);
  }

  getOrder(id: number): Observable<OrderDetailsDto> {

    return this.http.get<OrderDetailsDto>(`${environment.apiUrl}/Orders/GetOrder/${id}`);
  }
}
