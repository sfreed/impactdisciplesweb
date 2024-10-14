import { BaseModel } from "ag-common-lib/public-api";
import { Product, VariantModel } from "./products.model";

export class Cart extends BaseModel{
  owner_id: string;
  cartProducts: CartProduct[] = [];
  total_price: number = 0;
  sale_price_total: number = 0;
  total_weight: number = 0;
  total_quantity: number = 0;
  processed: boolean = false;
}

export class CartProduct {
  dbId: string;
  product: Product;
  variant: VariantModel;
  color: string;
  price: number = 0;
  sale_price: number = 0;
  quantity: number;
  quantity_shipped: number = 0;
  total_price: number = 0;
  total_sale_price: number = 0;
  total_weight: number = 0;
  status: CartStatus;
}

export class CartStatus {
  status: CartItemStatus;
  date: string;
}

export enum CartItemStatus {
  RECEIVED="RECEIVED",
  PARTIALLY_FULLFILLED="PARTIALLY_FULLFILLED",
  FULLFILLED="FULLFILLED",
  OUT_OF_STOCK="OUT_OF_STOCK"
}


