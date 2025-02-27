import React, {Dispatch, useState} from 'react';
import Layout from "../../components/Layout";
import Breadcrumb from "../../components/page-containers/Breadcrumb";
import {OrderItem} from "../../models/order-item";
import CartProduct from "../../components/cart-modal/CartProduct";
import {Order} from "../../models/order";
import {connect} from "react-redux";
import PromotionSection from "../home/PromotionSection";
import {setOrder} from "../../redux/actions/cartActions";
import PriceSummary from "../cart/PriceSummary";
import PaymentDetailsForm from "./PaymentDetailsForm";

const CheckoutPage = (props: { order: Order | undefined, setOrder: Function }) => {
    const [priceLoading, setPriceLoading] = useState(false);

    const breadcrumb = [
        {label: 'Home', link: '/'},
        {label: 'Cart', link: '/cart'},
        {label: 'Checkout', link: ''},
    ];

    return (
        <Layout>
            <Breadcrumb breadcrumb={breadcrumb}/>

            <div className={'container my-5'}>
                <div className={'row text-start'}>
                    <div className={'col-12'}>
                        <h1 className={'global-title-1 mb-3'}>Order completion</h1>
                    </div>
                </div>
                <div className={'row text-start'}>
                    <div className={'col-12 col-md-8'}>
                        <div className={'pe-lg-4'}>
                            <PaymentDetailsForm/>
                        </div>
                    </div>
                    <div className={'col-12 col-md-4'}>
                        {props.order && props.order.order_items?.length > 0 ? (
                            <div className={'ps-lg-4 pe-lg-3'}>
                                <div className={'d-flex justify-content-between align-items-center mb-4'}>
                                    <div className={'global-subtitle text-uppercase'}>Your order</div>
                                    <a href={'/cart'} className={'global-link'}>Edit</a>
                                </div>

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

const mapStateToProps = (state: { cart: { order: Order }}) => ({
    order: state.cart.order,
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setOrder: (order: Order) => dispatch(setOrder(order)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);