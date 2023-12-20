import axios from "axios";

export const getWishlist = async () => {
    try {
        const {data} = await axios.get('wishlist');

        return data;
    } catch (error) {
        console.error("Error fetching cart:", error);
        return null;
    }
}