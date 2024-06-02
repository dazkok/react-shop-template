import React, {Dispatch, SyntheticEvent} from 'react';
import {IconHeartBroken} from "@tabler/icons-react";
import {Product} from "../../../models/product";
import axios from "axios";
import {getCart} from "../../../components/cart-modal/getCart";
import {Order} from "../../../models/order";
import {setOrder} from "../../../redux/actions/cartActions";
import {connect} from "react-redux";
import {getWishlist} from "./getWishlist";
import {setWishlist} from "../../../redux/actions/wishlistActions";

const WishlistProduct = (props: { product: Product, setOrder: Function, setWishlist: Function }) => {
    const productPrice = props.product.price.toString().replace('.', ',');

    let productPromoPrice = '';
    let roundedDiscountPercentage = 0;

    if (props.product.promo_price) {
        productPromoPrice = props.product.promo_price.toString().replace('.', ',');

        const discountPercentage = ((props.product.price - props.product.promo_price) / props.product.price) * 100;
        roundedDiscountPercentage = Math.round(discountPercentage * 100) / 100;
    }

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

    const removeFromWishlist = async (e: SyntheticEvent, product_id: number) => {
        e.preventDefault();

        await axios.delete('wishlist/remove', {
            data: {
                product_id
            }
        })
            .then(async response => {
                const wishlistData = await getWishlist();

                if (wishlistData !== null) {
                    props.setWishlist(wishlistData);
                }
            })
            .catch(error => {
                console.error('Error when removing an item from the wishlist:', error);
            });
    }

    return (
        <div className={'col-6 col-lg-4 col-xxl-3'}>
            <a href={`/p/${props.product.link}`}
               className={'promotion-product-square d-flex flex-column justify-content-between h-100'}>
                <div>
                    <div className={'position-relative'}>
                        <img className={'product-square-image'}
                             src={`http://localhost:8010/images/${props.product.image ? props.product.image.image : 'placeholder.svg'}`}
                             alt={`${props.product.image ? props.product.image.alt : ''}`}
                             loading={'lazy'}
                             width={'100%'}
                        />

                        <div className={'d-flex flex-column align-items-start product-square-price'}>
                            {props.product.promo_price ? (
                                <>
                                    <div className={'bg-white mb-1 px-1 promo-percent shadow-sm'}>
                                        -{roundedDiscountPercentage} %
                                    </div>
                                    <div className={'bg-white px-1 shadow-sm'}>
                                        <del className={'old-price'}>{productPrice} zł</del>
                                        &nbsp;
                                        <span className={'promo-price'}>{productPromoPrice} zł</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div
                                        className={'product-square-normal-price bg-white px-1 shadow-sm'}>{productPrice} zł
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className={'p-2 text-start'}>
                        <div className={'square-product-title'}>
                            {props.product.title}
                        </div>
                        <div className={'square-product-category mt-1'}>
                            {props.product.category.title}
                        </div>
                    </div>
                </div>

                <div className={'d-flex justify-content-start align-items-center mt-2 w-100 px-2'}>
                    <button type={'button'}
                            onClick={(e) => addProductToCart(e, props.product.id)}
                            className={'btn global-button w-100 me-2'}>
                        Add to cart
                    </button>
                    <button type={'button'}
                            onClick={(e) => removeFromWishlist(e, props.product.id)}
                            className={'btn product-page-wishlist-button'}>
                        <IconHeartBroken size={24}/>
                    </button>
                </div>
            </a>
        </div>
    );
};

const mapStateToProps = (state: { cart: { order: Order } }) => ({
    order: state.cart.order
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setOrder: (order: Order) => dispatch(setOrder(order)),
    setWishlist: (wishlist: Product[]) => dispatch(setWishlist(wishlist))
})

export default connect(mapStateToProps, mapDispatchToProps)(WishlistProduct);