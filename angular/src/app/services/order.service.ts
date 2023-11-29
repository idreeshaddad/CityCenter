import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDto } from '../dtos/orders/order.dto';
import { environment } from 'src/environments/environment';
import { OrderDetailsDto } from '../dtos/orders/order-details.dto';
import { CreateUpdateOrderDto } from '../dtos/orders/create-update-order.dto';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

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

  getOrderForEdit(id: number): Observable<CreateUpdateOrderDto> {

    return this.http.get<CreateUpdateOrderDto>(`${environment.apiUrl}/Orders/GetOrderForEdit/${id}`);
  }

  createOrder(order: CreateUpdateOrderDto): Observable<any> {

    return this.http.post<CreateUpdateOrderDto>(`${environment.apiUrl}/Orders/CreateOrder`, order);
  }

  editOrder(id: number, order: CreateUpdateOrderDto): Observable<any> {

    return this.http.put<CreateUpdateOrderDto>(`${environment.apiUrl}/Orders/EditOrder/${id}`, order);
  }

  deleteOrder(id: number): Observable<any> {

    return this.http.delete(`${environment.apiUrl}/Orders/DeleteOrder/${id}`);
  }
}
