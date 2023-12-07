import { ProductDto } from "../product/product.model";

export interface CartDto {
  cartItems: CartItemDto[];
  totalPrice: number;
  orderId: number;
}

export interface CartItemDto {
  product: ProductDto
  quantity: number;
  creationDate: string;
}



