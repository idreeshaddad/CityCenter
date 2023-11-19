export interface CreateUpdateProduct {
  id: number;
  name: string;
  price: number;
  isInStock: boolean;
  description: string;
  quantity: number;
  brandId: number;
  productTypeId: number;
}
