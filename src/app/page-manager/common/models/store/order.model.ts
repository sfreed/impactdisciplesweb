import {
  Address,
  Agent,
  EmailAddress,
  PhoneNumber,
} from "ag-common-lib/public-api";
import { Cart } from "./cart.model";

export class Order {
  dbId?: string;
  customer: Agent;
  cart: Cart;
  current_status: OrderStatus;
  status_history: OrderStatus[] = [];
  stripe_transaction: any;
  order_total: number;

  customerFirstName?: string;
  customerLastName?: string;
  customerEmail?: EmailAddress = { ...new EmailAddress() };
  shippingAddress?: Address = { ...new Address() };
  billingAddress?: Address = { ...new Address() };
  customerPhone?: PhoneNumber = { ...new PhoneNumber() };
}

export class OrderStatus {
  status: Status;
  date: string;
}

export enum Status {
  STARTED = "STARTED",
  SUBMITTED = "SUBMITTED",
  RECEIVED = "RECEIVED",
  IN_PROGRESS = "IN_PROGRESS",
  READY_TO_SHIP = "READY_TO_SHIP",
  PARTIALLY_SHIPPED = "PARTIALLY_SHIPPED",
  SHIPPED = "SHIPPED",
}

export class LineItem {
  price?: string;
  quantity?: number;
}
