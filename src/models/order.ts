import {OrderItem} from "./order-item";

export class Order {
    id!: number;
    user_id!: number;
    user_cookie!: string;
    delivery_id!: number;
    delivery_link!: string;
    delivery_price!: number;
    status_id!: number;
    payment_id!: number;
    payed!: boolean;
    payu_order_nr!: string;
    payment_link!: string;
    remarks!: string;
    completed_at!: string;
    discount_code!: string;
    first_name!: string;
    last_name!: string;
    address!: string;
    address_additional!: string;
    city!: string;
    country!: string;
    zip!: string;

    email!: string;
    phone!: string;

    same_address!: boolean;
    want_invoice!: boolean;
    nip!: string;

    invoice_first_name!: string;
    invoice_last_name!: string;
    invoice_address!: string;
    invoice_city!: string;
    invoice_country!: string;
    invoice_zip!: string;

    totalQuantity!: number;
    totalSum!: number;
    originalSum!: number;
    discountedSum!: number;
    discountedDifference!: number;
    totalDifference!: number;
    finalSum!: number;
    cartWasChanged!: boolean;
    order_items!: OrderItem[];
}