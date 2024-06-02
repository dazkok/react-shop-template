import React, {Dispatch, SyntheticEvent} from 'react';
import {Product} from "../../models/product";
import {IconCalendarClock, IconHeart, IconInfoSquareRounded, IconThumbUp, IconTruckDelivery} from "@tabler/icons-react";
import axios from "axios";
import {getCart} from "../../components/cart-modal/getCart";
import {Order} from "../../models/order";
import {setOrder} from "../../redux/actions/cartActions";
import {connect} from "react-redux";
import IsProductInWishlist from "../account/wishlist/isProductInWishlist";

const ProductMainData = (props: { product: Product, setOrder: Function }) => {
    const productPrice = props.product.price.toString().replace('.', ',');

    let productPromoPrice = '';

    if (props.product.promo_price) {
        productPromoPrice = props.product.promo_price.toString().replace('.', ',');
    }

    const wishlistIcon = <IsProductInWishlist product_id={props.product.id} productPage={true}/>;

    const addProductToCart = async (e: SyntheticEvent, product_id: number) => {
        e.preventDefault();

        await axios.post('cart/add', {
            product_id
        })
            .then(async response => {
                const cartData = await getCart();

                if (cartData !== null) {
                    props.setOrder(cartData);
                }

                const cartIcon = document.getElementById('cart-icon');
                if (cartIcon) {
                    cartIcon.dispatchEvent(new Event('click'));
                }
            })
            .catch(error => {
                console.error('Error while adding an item to the cart:', error);
            });
    }

    return (
        <>
            <h1 className={'product-page-title'}>{props.product.title}</h1>

            <div className={'text-start mt-2 mb-5'}>
                {props.product.promo_price ? (
                    <>
                        <del className={'old-price'}>{productPrice} zł</del>
                        &nbsp;
                        <span className={'product-page-promo-price'}>{productPromoPrice} zł</span>
                    </>
                ) : (
                    <div className={'product-page-price'}>
                        {productPrice} zł
                    </div>
                )}
            </div>

            <div className="product-page-short-description text-start"
                 dangerouslySetInnerHTML={{__html: props.product.description}}
            />

            <div className={'d-flex justify-content-start align-items-center mt-4 w-100'}>
                <button type={'button'}
                        disabled={props.product.quantity < 1}
                        onClick={(e) => addProductToCart(e, props.product.id)}
                        className={'btn global-button product-page-cart-button me-2'}>
                    Add to cart
                </button>
                {wishlistIcon}
                {/*<button type={'button'}*/}
                {/*        className={'btn product-page-wishlist-button'}>*/}
                {/*    <IconHeart size={24}/>*/}
                {/*</button>*/}
            </div>

            <div className={'d-flex flex-column mt-4 text-start product-thumbs'}>
                <div className={'row d-flex align-items-center'}>
                    {props.product.quantity > 0 ?
                        <>
                            <div className={'col-1'}>
                                <IconThumbUp size={24} stroke={1.5}/>
                            </div>
                            <div className={'col-11'}>
                                <b>available</b>
                            </div>
                        </>
                        :
                        <>
                            <div className={'col-1'}>
                                <IconInfoSquareRounded size={24} stroke={1.5} style={{color: "#e32b2b"}}/>
                            </div>
                            <div className={'col-11'} style={{color: "#e32b2b"}}>
                                <b>out of stock</b>
                            </div>
                        </>
                    }
                </div>
                <div className={'row my-2 d-flex align-items-center'}>
                    <div className={'col-1'}>
                        <IconTruckDelivery size={24} stroke={1.5}/>
                    </div>
                    <div className={'col-11'}>
                        free shipping from 200 zł
                    </div>
                </div>
                <div className={'row d-flex align-items-center'}>
                    <div className={'col-1'}>
                        <IconCalendarClock size={24} stroke={1.5}/>
                    </div>
                    <div className={'col-11'}>
                        30 day return period
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state: { cart: { order: Order } }) => ({
    order: state.cart.order
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setOrder: (order: Order) => dispatch(setOrder(order))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductMainData);