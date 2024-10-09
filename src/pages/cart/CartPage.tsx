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

const CartPage = (props: { order: Order | undefined, setOrder: Function }) => {
    const [priceLoading, setPriceLoading] = useState(false);
    const [payMethods, setPayMethods] = useState<PayMethod[]>();
    const [promoCode, setPromoCode] = useState(props.order?.discount_code ? props.order?.discount_code : '');
    const [promoCodeAlertMessage, setPromoCodeAlertMessage] = useState('');
    const [promoCodeAlertType, setPromoCodeAlertType] = useState('');

    const breadcrumb = [
        {label: 'Home', link: '/'},
        {label: 'Cart', link: ''},
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
                            <h1 className={'global-title-1 mb-3'}>Your cart</h1>

                            {props.order && props.order.order_items?.length > 0 ? (
                                <>
                                    <div className={'global-text mb-4'}>
                                        TOTAL
                                        ({props.order.totalQuantity} {props.order.totalQuantity > 1 ? 'products' : 'product'}) <b>{props.order.totalSum.toString().replace('.', ',')} zł</b>
                                        <br/>
                                        The products in your cart are not reserved - finalize the transaction to order
                                        them.
                                    </div>

                                    {props.order.order_items.map((order_item: OrderItem) => (
                                        <CartProduct key={order_item.id} orderItem={order_item}
                                                     setPriceLoading={setPriceLoading} productStyle={'main-cart'}/>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <div className="modal-body">
                                        <div className={'text-start mt-5'}>
                                            Your shopping cart is empty &#129402;<br/>
                                            Add something!
                                        </div>
                                    </div>

                                    <div className="modal-footer d-flex flex-column">
                                        <button type="button"
                                                className="btn global-button global-secondary-button w-100 text-start"
                                                data-bs-dismiss="modal">Keep shopping
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className={'col-12 col-md-4'}>
                        {props.order && props.order.order_items?.length > 0 ? (
                            <div className={'ps-lg-4 pe-lg-3'}>
                                <button className="btn global-button w-100 text-start" type="button">Complete the
                                    transaction
                                </button>

                                <div className={'global-title-3 text-uppercase mt-5'}>Order summary</div>

                                <div className={'row global-text mt-4'}>
                                    <div className={'col-6'}>{props.order.totalQuantity} {props.order.totalQuantity > 1 ? 'products' : 'product'}</div>
                                    <div
                                        className={'col-6 text-end'}>{props.order.totalSum.toString().replace('.', ',')} zł
                                    </div>
                                    <div className={'col-6'}>Original price</div>
                                    <div
                                        className={'col-6 text-end'}>{props.order.originalSum.toString().replace('.', ',')} zł
                                    </div>
                                    <div className={'col-6'}>Delivery</div>
                                    <div className={'col-6 text-end'}>Free</div>
                                    {props.order.discountedDifference ?
                                        <>
                                            <div className={'col-6'} style={{color: "767677"}}>Discount</div>
                                            <div className={'col-6 text-end'}
                                                 style={{color: "767677"}}>{props.order.discountedDifference.toFixed(2).toString().replace('.', ',')} zł
                                            </div>
                                        </> : ''
                                    }
                                </div>

                                <div className={'row mt-3'} style={{fontWeight: '500'}}>
                                    <div className={'col-6'}>Total</div>
                                    <div
                                        className={'col-6 text-end'}>{props.order.finalSum.toFixed(2).toString().replace('.', ',')} zł
                                    </div>
                                </div>

                                <div className={'d-flex flex-column align-items-start mt-5'}>
                                    <div className={'w-100'}>
                                        <label htmlFor="promo_code" className="global-label">Enter promo code:</label>
                                        <input id="promo_code"
                                               type="email"
                                               value={promoCode}
                                               onChange={e => setPromoCode(e.target.value)}
                                               className="form-control global-input"
                                               placeholder={props.order.discount_code ? 'Applied: ' + props.order.discount_code : 'Promo code'}/>
                                    </div>

                                    {applyButton}

                                    <div className={'mt-3'}>
                                        <AlertComponent message={promoCodeAlertMessage}
                                                        alert_type={promoCodeAlertType}/>
                                    </div>
                                </div>

                                <div className={'global-subtitle-2 mt-5'}>Payment types</div>
                                <div className={'d-flex flex-wrap mt-3'}>
                                    {payMethods?.map((payMethod) => (
                                        <img key={payMethod.value}
                                             className={'object-fit-contain mb-3 me-2'}
                                             src={payMethod.brandImageUrl}
                                             alt={payMethod.name} loading={'lazy'} height={'24px'}/>
                                    ))}
                                </div>
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