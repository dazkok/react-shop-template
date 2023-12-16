import {Product} from "./product";

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    product_title: string;
    price: number;
    discounted_price: number;
    quantity: number;
    product: Product
}