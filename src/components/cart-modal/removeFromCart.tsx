import axios from "axios";

export const removeFromCart = async (order_item_id: number) => {
    try {
        const result = await axios.delete('cart/remove', {
            data: {
                order_item_id: order_item_id
            }
        });

        if (result.status === 204) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error fetching cart:", error);
        return false;
    }
}