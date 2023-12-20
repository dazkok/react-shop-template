import React, {useEffect, useState} from 'react';
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

const CartPage = (props: { order: Order | undefined }) => {
    const [priceLoading, setPriceLoading] = useState(false);
    const [payMethods, setPayMethods] = useState<PayMethod[]>();

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
                    console.log(payMethods);
                } catch (error) {
                    console.log('');
                }
            }
        )();
    }, []);

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
                                        ({props.order.order_items?.length} products) <b>{props.order.totalSum.toString().replace('.', ',')} zł</b>
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
                                    <div className={'col-6'}>{props.order.order_items?.length} products</div>
                                    <div
                                        className={'col-6 text-end'}>{props.order.totalSum.toString().replace('.', ',')} zł
                                    </div>
                                    <div className={'col-6'}>Original price</div>
                                    <div className={'col-6 text-end'}>500 zł</div>
                                    <div className={'col-6'}>Delivery</div>
                                    <div className={'col-6 text-end'}>Free</div>
                                </div>

                                <div className={'row mt-3'} style={{fontWeight: '500'}}>
                                    <div className={'col-6'}>Total</div>
                                    <div
                                        className={'col-6 text-end'}>{props.order.totalSum.toString().replace('.', ',')} zł
                                    </div>
                                </div>

                                <div className={'d-flex align-items-start mt-5'}>
                                    <IconDiscount2 stroke={1.5}/> <span className={'breadcrumb-item ms-2'}
                                                                        style={{fontWeight: '500'}}
                                                                        role={'button'}>ENTER PROMO CODE</span>
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

export default connect(mapStateToProps)(CartPage);