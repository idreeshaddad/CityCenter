import { OrderStatus } from "src/app/enums/order-status.enum";
import { PaymentMethod } from "src/app/enums/payment-method.enum";
import { SimpleProductDto } from "../product/simple-product.model";

export interface OrderDetailsDto {
  id: number;
  date: string;
  orderStatus: OrderStatus;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  customerFullName: string;
  products: SimpleProductDto[];
}
