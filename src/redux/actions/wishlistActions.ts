import {Product} from "../../models/product";

export const setWishlist = (wishlist: Product[]) => ({
    type: 'SET_WISHLIST',
    wishlist
})