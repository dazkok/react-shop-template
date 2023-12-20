import {Product} from "../../models/product";

const initialState = {
    wishlist: []
}

export const wishlistReducer = (
    state = initialState,
    action: { type: string, wishlist: Product[] }
) => {
    switch (action.type) {
        case "SET_WISHLIST":
            return {
                ...state,
                wishlist: action.wishlist
            }
        default:
            return state;
    }
}