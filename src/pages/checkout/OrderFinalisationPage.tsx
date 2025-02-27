import React from 'react';
import Layout from "../../components/Layout";
import Breadcrumb from "../../components/page-containers/Breadcrumb";
import PromotionSection from "../home/PromotionSection";
import OrderSummaryList from "./OrderSummaryList";
import {Order} from "../../models/order";
import {connect} from "react-redux";

const OrderFinalisationPage = (props: { order: Order }) => {
    const breadcrumb = [
        {label: 'Home', link: '/'},
        {label: 'Cart', link: '/cart'},
        {label: 'Checkout', link: '/checkout'},
        {label: 'Delivery and payment', link: ''},
    ];

    return (
        <Layout>
            <Breadcrumb breadcrumb={breadcrumb}/>

            <div className={'container my-5'}>
                <div className={'row text-start'}>
                    <div className={'col-12'}>
                        <h1 className={'global-title-1 mb-3'}>Delivery and payment</h1>
                    </div>
                </div>
                <div className={'row text-start'}>
                    <div className={'col-12 col-md-8'}>
                        <div className={'pe-lg-4'}>
                            <div className={'global-subtitle text-uppercase'}>Choose your method of delivery</div>

                            <div className={'global-subtitle text-uppercase'}>Choose your payment method</div>

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

export default connect(mapStateToProps)(OrderFinalisationPage);