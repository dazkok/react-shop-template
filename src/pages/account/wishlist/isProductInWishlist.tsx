import React, {Dispatch, SyntheticEvent, useState} from 'react';
import {Product} from "../../../models/product";
import {connect} from "react-redux";
import {IconHeart, IconHeartFilled} from "@tabler/icons-react";
import axios from "axios";
import {getWishlist} from "./getWishlist";
import {setWishlist} from "../../../redux/actions/wishlistActions";

const IsProductInWishlist = (props: {
    product_id: number,
    productPage?: boolean,
    wishlist: Product[],
    setWishlist: Function
}) => {
    const [loading, setLoading] = useState(false);
    const isProductInWishlist = props.wishlist.some(product => product.id === props.product_id);

    const addToWishlist = async (e: SyntheticEvent, product_id: number) => {
        e.preventDefault();

        setLoading(true);

        await axios.post('wishlist/add', {
            product_id
        })
            .then(async response => {
                const wishlistData = await getWishlist();

                if (wishlistData !== null) {
                    props.setWishlist(wishlistData);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error while adding an item to the wishlist:', error);
            });
    }

    const removeFromWishlist = async (e: SyntheticEvent, product_id: number) => {
        e.preventDefault();

        setLoading(true);

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
                setLoading(false);
            })
            .catch(error => {
                console.error('Error when removing an item from the wishlist:', error);
            });
    }

    return (
        isProductInWishlist ? (
            props.productPage ?
                <button type={'button'}
                        onClick={(e) => removeFromWishlist(e, props.product_id)}
                        className={'btn product-page-wishlist-button'}>
                    {loading ? (
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <IconHeartFilled size={24}/>
                    )}
                </button> :
                <div className={'wishlist-section'} role={'button'}
                     onClick={(e) => removeFromWishlist(e, props.product_id)}>
                    {loading ? (
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <IconHeartFilled/>
                    )}
                </div>
        ) : (
            props.productPage ?
                <button type={'button'}
                        onClick={(e) => addToWishlist(e, props.product_id)}
                        className={'btn product-page-wishlist-button'}>
                    {loading ? (
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <IconHeart size={24}/>
                    )}
                </button> :
                <div className={'wishlist-section'} role={'button'}
                     onClick={(e) => addToWishlist(e, props.product_id)}>
                    {loading ? (
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <IconHeart/>
                    )}
                </div>
        )
    );
};

const mapStateToProps = (state: { wishlist: { wishlist: Product[] } }) => ({
    wishlist: state.wishlist.wishlist
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setWishlist: (wishlist: Product[]) => dispatch(setWishlist(wishlist))
})

export default connect(mapStateToProps, mapDispatchToProps)(IsProductInWishlist);
