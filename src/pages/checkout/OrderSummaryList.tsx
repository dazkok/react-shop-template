import React, {useState} from 'react';
import '../../css/cart.css';
import CartProduct from "../../components/cart-modal/CartProduct";
import {Order} from "../../models/order";
import {OrderItem} from "../../models/order-item";
import PriceSummary from "../../pages/cart/PriceSummary";

const CartModalComponent = (props: { order: Order }) => {
    const [priceLoading, setPriceLoading] = useState(false);

    return (
        <div className={'ps-lg-4 pe-lg-3'}>

            <div className={'d-flex justify-content-between align-items-center mb-4'}>
                <div className={'global-subtitle text-uppercase'}>Your order</div>
                <a href={'/cart'} className={'global-link'}>Edit</a>
            </div>

            {props.order && props.order.order_items?.length > 0 ? (
                <PriceSummary order={props.order} priceLoading={priceLoading}/>
            ) : ''}

            <hr className={'my-4'}/>

            {props.order && props.order.order_items?.length > 0 ? (
                <>
                    {props.order.order_items.map((order_item: OrderItem) => (
                        <CartProduct key={order_item.id} orderItem={order_item}
                                     setPriceLoading={setPriceLoading} productStyle={'summary'}/>
                    ))}
                </>
            ) : ''}
        </div>
    );
};


export default (CartModalComponent);