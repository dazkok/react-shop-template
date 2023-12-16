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
    want_invoice!: boolean;
    remarks!: string;
    completed_at!: string;
    discount_code!: string;
    first_name!: string;
    last_name!: string;
    address!: string;
    city!: string;
    country!: string;
    zip!: string;
    email!: string;
    phone!: string;
    invoice_first_name!: string;
    invoice_last_name!: string;
    invoice_company!: string;
    invoice_nip!: string;
    invoice_address!: string;
    invoice_city!: string;
    invoice_country!: string;
    invoice_zip!: string;
    totalSum!: number;
    order_items!: OrderItem[];
}