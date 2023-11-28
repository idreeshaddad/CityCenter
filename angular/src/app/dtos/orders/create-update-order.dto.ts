import { PaymentMethod } from "src/app/enums/payment-method.enum";

export interface CreateUpdateOrderDto {
  id: number;
  paymentMethod: PaymentMethod;
  customerId: number;
  productIds: number[];
}
