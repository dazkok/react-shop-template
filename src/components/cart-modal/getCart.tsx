import axios from "axios";

export const getCart = async () => {
    try {
        const {data} = await axios.get('cart');

        return data;
    } catch (error) {
        console.error("Error fetching cart:", error);
        return null;
    }
}