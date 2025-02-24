import React, {Dispatch} from 'react';
import {Order} from "../../models/order";
import {setOrder, updateQuantity} from "../../redux/actions/cartActions";
import {connect} from "react-redux";

const PriceSummary = (props: {
    order: Order,
    setOrder: Function,
    updateQuantity: Function
}) => {
    return (
        <>
            <div className={'row global-text mt-4'}>
                <div
                    className={'col-6 text-nowrap text-start'}>Value of {props.order.totalQuantity > 1 ? 'products' : 'product'} ({props.order.totalQuantity})</div>
                <div
                    className={'col-6 text-end text-nowrap'}>{props.order.originalSum.toString().replace('.', ',')} zł
                </div>

                {props.order.totalDifference ?
                    <>
                        <div className={'col-6 text-start'}>Special offers</div>
                        <div className={'col-6 text-end text-nowrap promo-price'}>
                            {props.order.totalDifference.toFixed(2).toString().replace('.', ',')} zł
                        </div>
                    </> : ''
                }

                {props.order.discountedDifference ?
                    <>
                        <div className={'col-6 text-start'}>Promo code discount
                            {props.order.discount_code ?
                                <>
                                    <br/>
                                    <span
                                        className={'applied-code text-nowrap'}>Applied code: {props.order.discount_code}</span>
                                </> : ''
                            }
                        </div>
                        <div className={'col-6 text-end text-nowrap promo-price'}>
                            {props.order.discountedDifference.toFixed(2).toString().replace('.', ',')} zł
                        </div>
                    </> : ''
                }

                <div className={'col-6 text-start'}>Delivery</div>
                <div className={'col-6 text-end text-nowrap'}>Free</div>
            </div>

            <div className={'row mt-3'} style={{fontWeight: '500'}}>
                <div className={'col-6 text-start'}>Total</div>
                <div
                    className={'col-6 text-end text-nowrap'}>{props.order.finalSum.toFixed(2).toString().replace('.', ',')} zł
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state: { cart: { order: Order } }) => ({
    order: state.cart.order
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setOrder: (order: Order) => dispatch(setOrder(order)),
    updateQuantity: (orderItemId: number, newQuantity: number) => dispatch(updateQuantity(orderItemId, newQuantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(PriceSummary);