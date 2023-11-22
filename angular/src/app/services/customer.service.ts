import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerDto } from '../dtos/customers/customer.model';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { CreateUpdateCustomerDto } from '../dtos/customers/create-update-customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<CustomerDto[]> {

    return this.http.get<CustomerDto[]>(`${environment.apiUrl}/Customers/GetCustomers`);
  }

  getCustomer(id: number): Observable<CustomerDto> {

    return this.http.get<CustomerDto>(`${environment.apiUrl}/Customers/GetCustomer/${id}`);
  }

  createCustomer(customer: CustomerDto): Observable<any> {

    return this.http.post<CustomerDto>(`${environment.apiUrl}/Customers/CreateCustomer`, customer);
  }

  editCustomer(id: number, customer: CustomerDto): Observable<any> {

    return this.http.put<CustomerDto>(`${environment.apiUrl}/Customers/EditCustomer/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<any> {

    return this.http.delete<CustomerDto>(`${environment.apiUrl}/Customers/DeleteCustomer/${id}`)
  }

  getCustomerForEdit(id: number): Observable<CreateUpdateCustomerDto> {

    return this.http.get<CreateUpdateCustomerDto>(`${environment.apiUrl}/Customers/GetCustomerForEdit/${id}`);
  }

}
