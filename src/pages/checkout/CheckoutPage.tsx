import React from 'react';
import Layout from "../../components/Layout";
import Breadcrumb from "../../components/page-containers/Breadcrumb";
import {Order} from "../../models/order";
import {connect} from "react-redux";
import PromotionSection from "../home/PromotionSection";
import PaymentDetailsForm from "./OrderDetailsForm";
import OrderSummaryList from "./OrderSummaryList";

const CheckoutPage = (props: { order: Order }) => {
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
                            <PaymentDetailsForm order={props.order}/>
                        </div>
                    </div>
                    <div className={'col-12 col-md-4'}>
                        <OrderSummaryList order={props.order}/>
                    </div>
                </div>
            </div>
            <PromotionSection/>
        </Layout>
    );
};

const mapStateToProps = (state: { cart: { order: Order } }) => ({
    order: state.cart.order,
})
export default connect(mapStateToProps)(CheckoutPage);