import { OrderStatus } from "src/app/enums/order-status.enum";
import { PaymentMethod } from "src/app/enums/payment-method.enum";

export interface OrderDto {

  id: number;
  date: string;
  orderStatus: OrderStatus;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  customerFullName: string;
}
