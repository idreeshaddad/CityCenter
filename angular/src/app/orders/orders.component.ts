import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { OrderDto } from '../dtos/orders/order.dto';
import { PaymentMethod } from '../enums/payment-method.enum';
import { OrderStatus } from '../enums/order-status.enum';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: OrderDto[] = [];
  displayedColumns: string[] = ['customer', 'orderTime', 'orderStatus', 'totalPrice', 'paymentMethod', 'actions'];

  orderStatusEnum = OrderStatus;
  paymentMethodEnum = PaymentMethod;

  constructor(
    private orderSvc: OrderService
  ) { }

  ngOnInit(): void {

    this.loadOrders();
  }

  openDeleteDialog(order: OrderDto): void {
    alert("[NOT IMPLEMENTED YET]");
  }

  //#region Private Functions

  private loadOrders(): void {

    this.orderSvc.getOrders().subscribe({
      next: (ordersFromApi: OrderDto[]) => {
        this.orders = ordersFromApi;
      }
    });
  }

  //#endregion

}
