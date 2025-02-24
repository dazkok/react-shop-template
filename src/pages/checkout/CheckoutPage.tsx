import React, {Dispatch, SyntheticEvent, useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import Breadcrumb from "../../components/page-containers/Breadcrumb";
import {OrderItem} from "../../models/order-item";
import CartProduct from "../../components/cart-modal/CartProduct";
import {Order} from "../../models/order";
import {connect} from "react-redux";
import {IconDiscount2} from "@tabler/icons-react";
import PromotionSection from "../home/PromotionSection";
import axios from "axios";
import {PayMethod} from "../../models/pay-method";
import {getCart} from "../../components/cart-modal/getCart";
import {setOrder, updateQuantity} from "../../redux/actions/cartActions";
import AlertComponent from "../../components/alerts/Alerts";
import PriceSummary from "../cart/PriceSummary";

const CartPage = (props: { order: Order | undefined, setOrder: Function }) => {
    const [priceLoading, setPriceLoading] = useState(false);
    const [payMethods, setPayMethods] = useState<PayMethod[]>();
    const [promoCode, setPromoCode] = useState(props.order?.discount_code ? props.order?.discount_code : '');
    const [promoCodeAlertMessage, setPromoCodeAlertMessage] = useState('');
    const [promoCodeAlertType, setPromoCodeAlertType] = useState('');

    const breadcrumb = [
        {label: 'Home', link: '/'},
        {label: 'Cart', link: '/cart'},
        {label: 'Checkout', link: ''},
    ];

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get(`pay-methods`);

                    setPayMethods(data);
                } catch (error) {
                    console.log('');
                }
            }
        )();
    }, []);

    let applyButton = null;
    if (promoCode === '') {
        applyButton = '';
    } else {
        applyButton = <button className="btn global-button global-secondary-button w-100 text-start mt-3"
                              onClick={(e) => applyDiscountCode(e)}
                              type="button">Apply</button>;
    }

    const applyDiscountCode = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            let response = await axios.put('cart/discount-code', {
                discount_code: promoCode,
            });

            if (response.data === 'success') {
                setPromoCodeAlertMessage('Discount code applied successfully');
                setPromoCodeAlertType('success');
            }

            const cartData = await getCart();

            if (cartData !== null) {
                props.setOrder(cartData);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404) {
                    setPromoCodeAlertMessage('Invalid promo code');
                    setPromoCodeAlertType('danger');
                } else {
                    setPromoCodeAlertMessage('Error while applying discount code');
                    setPromoCodeAlertType('danger');
                }
            } else {
                setPromoCodeAlertMessage('An unexpected error occurred');
                setPromoCodeAlertType('danger');
            }

            setPriceLoading(false);
            console.error("Error while changing the quantity of products in the cart:", error);
        } finally {
            setPriceLoading(false);
        }
    };

    return (
        <Layout>
            <Breadcrumb breadcrumb={breadcrumb}/>

            <div className={'container my-5'}>
                <div className={'row text-start'}>
                    <div className={'col-12 col-md-8'}>
                        <div className={'pe-lg-4'}>
                            <h1 className={'global-title-1 mb-3'}>Shipping information</h1>


                        </div>
                    </div>
                    <div className={'col-12 col-md-4'}>
                        {props.order && props.order.order_items?.length > 0 ? (
                            <div className={'ps-lg-4 pe-lg-3'}>


                                <div className={'global-title-3 text-uppercase mt-5'}>Your order</div>

                                <PriceSummary/>

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
                        ) : ''}
                    </div>
                </div>
            </div>
            <PromotionSection/>

        </Layout>
    );
};

const mapStateToProps = (state: { cart: { order: Order } }) => ({
    order: state.cart.order
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setOrder: (order: Order) => dispatch(setOrder(order)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);