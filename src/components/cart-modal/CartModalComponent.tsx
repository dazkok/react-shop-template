import React, {Dispatch, useEffect, useState} from 'react';
import '../../css/cart.css';
import CartProduct from "./CartProduct";
import {Order} from "../../models/order";
import {setOrder, updateQuantity} from "../../redux/actions/cartActions";
import {connect} from "react-redux";
import {OrderItem} from "../../models/order-item";
import {getCart} from "./getCart";
import AlertComponent from "../alerts/Alerts";
import PriceSummary from "../../pages/cart/PriceSummary";

const CartModalComponent = (props: any) => {
    const [loading, setLoading] = useState(true);
    const [priceLoading, setPriceLoading] = useState(false);

    useEffect(() => {
        (
            async () => {
                try {
                    const cartData = await getCart();

                    props.setOrder(cartData);

                    setLoading(false);
                } catch (error) {
                    console.log('');
                }
            }
        )();
    }, []);

    return (
        <div className="modal fade" id="cartModal" aria-labelledby="cartModalLabel"
             aria-hidden="true">
            <div className="modal-dialog cart-dialog">
                <div className="modal-content cart-modal-content">
                    {loading ? (
                        <div style={{height: '500px'}}
                             className={'d-flex align-items-center justify-content-center'}>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="modal-header px-3 py-2">
                                <div className="cart-title" id="cartModalLabel">Products in the cart
                                    ({props.order ? props.order.totalQuantity : ''})
                                </div>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>

                            {props.order && props.order.totalQuantity > 0 ? (
                                <>
                                    <div className="modal-body">
                                        {props.order.order_items.map((order_item: OrderItem) => (
                                            <CartProduct key={order_item.id} orderItem={order_item}
                                                         setPriceLoading={setPriceLoading} productStyle={'small-cart'}/>
                                        ))}
                                        {props.order.cartWasChanged ?
                                            <AlertComponent alert_type="danger"
                                                            message={'Niektóre produkty z twojego koszyku zostały zmienione lub usunięte.'}/>
                                            : ''
                                        }
                                    </div>

                                    <div className="modal-footer d-flex flex-column">
                                        {priceLoading ? (
                                            <div
                                                className={'d-flex align-items-center justify-content-center py-3 mb-2'}>
                                                <div className="spinner-border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className={'row w-100 cart-footer-text'}>
                                                    <div className={'col-6 text-start p-0'}>Value of {props.order.totalQuantity > 1 ? 'products' : 'product'} ({props.order.totalQuantity})</div>
                                                    <div className={'col-6 text-end p-0'}>{props.order.originalSum.toString().replace('.', ',')} zł</div>
                                                </div>

                                                <div className={'row w-100 cart-footer-text'}>
                                                    <div className={'col-6 text-start p-0'}>Special offers</div>
                                                    <div className={'col-6 text-end p-0 promo-price'}>{props.order.totalDifference.toFixed(2).toString().replace('.', ',')} zł</div>
                                                </div>

                                                {props.order.discountedDifference ?
                                                    <>
                                                        <div className={'row w-100 cart-footer-text'}>
                                                            <div className={'col-6 text-start p-0'}>Promo code discount</div>
                                                            <div className={'col-6 text-end p-0 promo-price'}>{props.order.discountedDifference.toFixed(2).toString().replace('.', ',')} zł</div>
                                                        </div>
                                                    </> : ''
                                                }

                                                <div className={'row w-100 cart-footer-text'}>
                                                    <div className={'col-6 text-start p-0'}>Delivery</div>
                                                    <div className={'col-6 text-end p-0'}>Free</div>
                                                </div>

                                                <div className={'row mt-3 w-100'}>
                                                    <div className={'col-6 text-start p-0'}>Total</div>
                                                    <div className={'col-6 text-end p-0'}>{props.order.finalSum.toFixed(2).toString().replace('.', ',')} zł</div>
                                                </div>
                                            </>
                                        )}

                                        <a href={'/cart'}
                                           className="btn global-button w-100 text-start mb-2 mt-4">Show cart</a>
                                        <button type="button"
                                                className="btn global-button global-secondary-button w-100 text-start"
                                                data-bs-dismiss="modal">Keep shopping
                                        </button>
                                    </div>
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: { cart: { order: Order } }) => ({
    order: state.cart.order
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setOrder: (order: Order) => dispatch(setOrder(order)),
    updateQuantity: (orderItemId: number, newQuantity: number) => dispatch(updateQuantity(orderItemId, newQuantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartModalComponent);