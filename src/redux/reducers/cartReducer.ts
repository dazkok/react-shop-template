import {Order} from "../../models/order";
import {OrderItem} from "../../models/order-item";

const initialState = {
    order: new Order()
}

export const cartReducer = (
    state = initialState,
    action: { type: string, order: Order, orderItemId: number, quantity: number }
) => {
    switch (action.type) {
        case "SET_CART":
            return {
                ...state,
                order: action.order
            }
        case "UPDATE_QUANTITY":
            const updatedOrderItems = state.order.order_items.map((item: OrderItem) => {
                if (item.id === action.orderItemId) {
                    return {...item, quantity: action.quantity};
                } else {
                    return item;
                }
            });

            return {
                ...state,
                order: {...state.order, order_items: updatedOrderItems},
            };
        default:
            return state;
    }
}

