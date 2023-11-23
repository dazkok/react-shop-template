import React from 'react';
import {Product} from "../../models/product";
import {IconCalendarClock, IconHeart, IconThumbUp, IconTruckDelivery} from "@tabler/icons-react";

const ProductMainData = (props: { product: Product }) => {
    const productPrice = props.product.price.toString().replace('.', ',');

    let productPromoPrice = '';
    let roundedDiscountPercentage = 0;

    if (props.product.promo_price) {
        productPromoPrice = props.product.promo_price.toString().replace('.', ',');

        const discountPercentage = ((props.product.price - props.product.promo_price) / props.product.price) * 100;
        roundedDiscountPercentage = Math.round(discountPercentage * 100) / 100;
    }

    return (
        <>
            <div className={'product-page-title'}>{props.product.title}</div>

            <div className={'text-start mt-2 mb-5'}>
                {props.product.promo_price ? (
                    <>
                        {/*<div className={'bg-white mb-1 px-1 promo-percent shadow-sm'}>*/}
                        {/*    -{roundedDiscountPercentage} %*/}
                        {/*</div>*/}
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
                        className={'btn global-button product-page-cart-button me-2'}>
                    Add to cart
                </button>
                <button type={'button'}
                        className={'btn product-page-wishlist-button'}>
                    <IconHeart size={24}/>
                </button>
            </div>

            <div className={'d-flex flex-column mt-4 text-start product-thumbs'}>
                <div className={'row d-flex align-items-center'}>
                    <div className={'col-1'}>
                        <IconThumbUp size={24} stroke={1.5}/>
                    </div>
                    <div className={'col-11'}>
                        available
                    </div>
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

export default ProductMainData;
