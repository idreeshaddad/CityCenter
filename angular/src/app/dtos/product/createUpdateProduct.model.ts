export interface CreateUpdateProductDto {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  brandId: number;
  productTypeId: number;
}
