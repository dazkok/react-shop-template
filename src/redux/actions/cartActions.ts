import {Order} from "../../models/order";

export const setOrder = (order: Order) => ({
    type: 'SET_CART',
    order
})

export const updateQuantity = (orderItemId: number, quantity: number) => ({
    type: 'UPDATE_QUANTITY',
    orderItemId,
    quantity,
});