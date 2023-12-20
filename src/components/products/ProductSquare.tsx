import React from 'react';
import '../../css/product-square.css';
import {Product} from "../../models/product";
import IsProductInWishlist from "../../pages/account/wishlist/isProductInWishlist";

const ProductSquare = (props: { product: Product, maxWidth: boolean | undefined }) => {
    const productPrice = props.product.price.toString().replace('.', ',');

    let productPromoPrice = '';
    let roundedDiscountPercentage = 0;

    if (props.product.promo_price) {
        productPromoPrice = props.product.promo_price.toString().replace('.', ',');

        const discountPercentage = ((props.product.price - props.product.promo_price) / props.product.price) * 100;
        roundedDiscountPercentage = Math.round(discountPercentage * 100) / 100;
    }

    const wishlistIcon = <IsProductInWishlist product_id={props.product.id}/>;

    return (
        <>
            <a href={`/p/${props.product.link}`}
               className={'promotion-product-square'} style={{maxWidth: props.maxWidth ? '270px' : 'none'}}>
                <div className={'position-relative'}>
                    <img className={'product-square-image'}
                         src={`http://localhost:8010/images/${props.product.images[0].image}`}
                         alt={''}
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

                {wishlistIcon}
            </a>
        </>
    );
};

export default ProductSquare;
