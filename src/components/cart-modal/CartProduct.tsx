import React, {Dispatch, useCallback, useRef, useEffect, useState} from 'react';
import {IconHeart, IconMinus, IconPlus, IconTrash} from "@tabler/icons-react";
import {OrderItem} from "../../models/order-item";
import {removeFromCart} from "./removeFromCart";
import {getCart} from "./getCart";
import {Order} from "../../models/order";
import {setOrder, updateQuantity} from "../../redux/actions/cartActions";
import {connect} from "react-redux";
import axios from "axios";
import IsProductInWishlist from "../../pages/account/wishlist/isProductInWishlist";

const CartProduct = (props: {
    orderItem: OrderItem,
    setOrder: Function,
    updateQuantity: Function,
    setPriceLoading: Function,
    productStyle: string
}) => {
    const productPrice = props.orderItem.product.price.toString().replace('.', ',');

    let productPromoPrice = '';

    if (props.orderItem.product.promo_price) {
        productPromoPrice = props.orderItem.product.promo_price.toString().replace('.', ',');
    }

    const debounce = (callback: (...args: any[]) => void, wait: number) => {
        let timerId: NodeJS.Timeout;

        return (...args: any[]) => {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                callback(...args);
            }, wait);
        };
    };

    const quantityRef = useRef(props.orderItem.quantity);

    useEffect(() => {
        quantityRef.current = props.orderItem.quantity;
    }, [props.orderItem.quantity]);

    const debouncedUpdateItemQuantityAxios = useCallback(
        debounce(async () => {
            try {
                await axios.put('cart/quantity', {
                    order_item_id: props.orderItem.id,
                    new_quantity: quantityRef.current,
                });

                const cartData = await getCart();

                if (cartData !== null) {
                    props.setOrder(cartData);
                }
            } catch (error) {
                props.setPriceLoading(false);
                console.error("Error while changing the quantity of products in the cart:", error);
            } finally {
                props.setPriceLoading(false);
            }
        }, 2000),
        [props.orderItem.id, props.setOrder]
    );

    const updateItemQuantity = (newQuantity: number) => {
        props.setPriceLoading(true);

        if (newQuantity > 0 && newQuantity <= props.orderItem.product.quantity) {
            quantityRef.current = newQuantity;
            props.updateQuantity(props.orderItem.id, newQuantity);
        }
    };

    const quantityButtons = <div className={'d-flex'}>
        <div role={'button'} className={'minus-button'}>
            <IconMinus stroke={1.5} color={'black'}
                       onClick={() => {
                           debouncedUpdateItemQuantityAxios();
                           updateItemQuantity(props.orderItem.quantity - 1);
                       }}
            />
        </div>
        <div className={'count-field'}>{props.orderItem.quantity}</div>
        <div role={'button'} className={'plus-button'}>
            <IconPlus stroke={1.5} color={'black'}
                      onClick={() => {
                          debouncedUpdateItemQuantityAxios();
                          updateItemQuantity(props.orderItem.quantity + 1);
                      }}
            />
        </div>
    </div>;

    const wishlistIcon = <IsProductInWishlist product_id={props.orderItem.id}/>;

    return (
        props.productStyle === 'small-cart' ? (
            <div className={'row mb-3'}>
                <div className={'col-4'}>
                    <img className={'object-fit-contain'}
                         src={`http://localhost:8010/images/${props.orderItem.product.image.image}`}
                         alt={props.orderItem.product.image.alt}
                         loading={'lazy'}
                         width={'100%'}
                    />
                </div>

                <div className={'col-6 text-start ps-0 d-flex flex-column justify-content-between'}>
                    <div>
                        <div className={'square-product-title'}>
                            {props.orderItem.product.title}
                        </div>

                        {props.orderItem.product.promo_price ? (
                            <>
                                <del className={'old-price'}>{productPrice} zł</del>
                                &nbsp;
                                <span className={'promo-price'}>{productPromoPrice} zł</span>
                            </>
                        ) : (
                            <>
                                <div
                                    className={'product-square-normal-price'}>{productPrice} zł
                                </div>
                            </>
                        )}
                    </div>

                    {quantityButtons}
                </div>

                <div className={'col-2 d-flex flex-column align-items-end'}>
                    <IconTrash stroke={1.5} color={'#000'} className={'mb-3'}
                               role={'button'}
                               onClick={() => (
                                   removeFromCart(props.orderItem.id)
                                       .then(async response => {
                                           const cartData = await getCart();

                                           if (cartData !== null) {
                                               props.setOrder(cartData);
                                           }
                                       })
                               )}/>
                    <div className={'position-relative'} style={{marginRight: '-10px'}}>
                        {wishlistIcon}
                    </div>
                    {/*<IconHeart stroke={1.5} color={'#000'}/>*/}
                </div>
            </div>
        ) : (
            <div className={'row mb-3'}>
                <div className={'col-12'}>
                    <div style={{border: '1px solid black'}}>
                        <div className={'row'}>
                            <div className={'col-4 pe-0'}>
                                <img className={'object-fit-contain'}
                                     src={`http://localhost:8010/images/${props.orderItem.product.image.image}`}
                                     alt={props.orderItem.product.image.alt}
                                     loading={'lazy'}
                                     width={'100%'}
                                />
                            </div>

                            <div className={'col-8 text-start ps-0'}>
                                <div className={'row h-100'}>
                                    <div className={'col-9'}>
                                        <div className={'py-3 px-4 d-flex flex-column justify-content-between h-100'}>
                                            <div>
                                                <div className={'square-product-title'}>
                                                    {props.orderItem.product.title}
                                                </div>
                                                <div
                                                    className="square-product-category mt-1">{props.orderItem.product.category?.title}</div>

                                                {props.orderItem.product.promo_price ? (
                                                    <>
                                                        <del className={'old-price'}>{productPrice} zł</del>
                                                        &nbsp;
                                                        <span className={'promo-price'}>{productPromoPrice} zł</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div
                                                            className={'product-square-normal-price'}>{productPrice} zł
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                            {quantityButtons}
                                        </div>
                                    </div>

                                    <div className={'col-3 d-flex flex-column align-items-end'}>
                                        <IconTrash stroke={1.5} color={'#000'} className={'my-3 me-3'}
                                                   role={'button'}
                                                   onClick={() => (
                                                       removeFromCart(props.orderItem.id)
                                                           .then(async response => {
                                                               const cartData = await getCart();

                                                               if (cartData !== null) {
                                                                   props.setOrder(cartData);
                                                               }
                                                           })
                                                   )}/>
                                        <IconHeart stroke={1.5} color={'#000'} className={'me-3'}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

const mapStateToProps = (state: { cart: { order: Order } }) => ({
    order: state.cart.order
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setOrder: (order: Order) => dispatch(setOrder(order)),
    updateQuantity: (orderItemId: number, newQuantity: number) => dispatch(updateQuantity(orderItemId, newQuantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartProduct);