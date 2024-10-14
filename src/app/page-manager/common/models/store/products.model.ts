import { BaseModel } from "impactdisciplescommon/src/models/base.model";

export class VariantModel {
    type: string;
    value: string;
    price: number;
    sale_price: number;
    discount: number;
    stock: number;
}

export class Product extends BaseModel{
    dbId: string;
    title: string;
    description: string;
    category1: string;
    category2: string;
    tags: Tag[] = [];
    variants: VariantModel[] = [];
    weight: number;
    length: number;
    width: number;
    height: number;
    images: ProductImage[] = [];
    language: string;
    low_price: number;
    high_price: number;
}

export class Tag{
  type: string;
  value: string;
}

export class ProductImage{
  name: string;
  url: string;
}

