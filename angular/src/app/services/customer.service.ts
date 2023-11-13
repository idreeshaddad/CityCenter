import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customers/customer.model';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {

    return this.http.get<Customer[]>(`${environment.apiUrl}/Customers/GetCustomers`);
  }

  getCustomer(id: number): Observable<Customer> {

    return this.http.get<Customer>(`${environment.apiUrl}/Customers/GetCustomer/${id}`);
  }

  createCustomer(customer: Customer): Observable<any> {

    return this.http.post<Customer>(`${environment.apiUrl}/Customers/CreateCustomer`, customer);
  }

  editCustomer(id: number, customer: Customer): Observable<any> {

    return this.http.put<Customer>(`${environment.apiUrl}/Customers/EditCustomer/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<any> {

    return this.http.delete<Customer>(`${environment.apiUrl}/Customers/DeleteCustomer/${id}`)
  }

}
