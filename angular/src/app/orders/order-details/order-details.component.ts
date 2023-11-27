import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailsDto } from 'src/app/dtos/orders/order-details.dto';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderId!: number;
  order?: OrderDetailsDto;

  constructor(
    private orderSvc: OrderService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.setOrderId();

    if (this.orderId) {

      this.loadOrder();
    }

  }

  //#region Private functions

  private setOrderId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.orderId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  }

  private loadOrder(): void {

    this.orderSvc.getOrder(this.orderId).subscribe({
      next: (orderFromApi: OrderDetailsDto) => {
        this.order = orderFromApi;
      }
    });
  }

  //#region

}
