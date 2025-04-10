import React, {useEffect, useState} from 'react';
import {Category} from "../models/category";
import {IconHeart, IconMenu2, IconSearch, IconShoppingCart, IconUser, IconX} from "@tabler/icons-react";
import {Order} from "../models/order";
import {connect} from "react-redux";
import {User} from "../models/user";
import {Product} from "../models/product";
import axios from "axios";
import ProductSquare from "./products/ProductSquare";

const Header = (props: { categories: Category[], order: Order, user: User, wishlist: Product[] }) => {
    const [userLink, setUserLink] = useState('#');
    const [wishlistLink, setWishlistLink] = useState('/login');
    const [searchInput, setSearchInput] = useState('');  // State for search input
    const [searchResults, setSearchResults] = useState<Product[]>();

    useEffect(() => {
        if (props.user?.id) {
            setUserLink('/account');
            setWishlistLink('/account/wishlist');
        } else {
            setUserLink('/login');
            setWishlistLink('/login');
        }
    }, [props.user?.first_name]);

    const handleSearchInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setSearchInput(event.target.value);

            if (event.target.value.length > 3) {
                const {data} = await axios.get('search/' + event.target.value);
                setSearchResults(data);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.log('');
        }
    }

    const clearSearchInput = () => {
        setSearchInput('');
        setSearchResults([]);
    }

    return (
        <header className="border-bottom bg-white py-1 py-md-0">
            <div className="container-fluid px-3 px-xl-4 px-xxl-5">
                <div className={'row justify-content-between flex-nowrap'} style={{height: '48px'}}>
                    <a href="/"
                       className="col-2 col-md-auto col-xxl-2 col-xxxl-3 d-flex align-items-center text-decoration-none">
                        <img width="auto" height="60" loading={'lazy'}
                             src="http://localhost:8010/images/page/rostmatygift-logo.png"
                             className="page-logo" alt="ROSTMARYGIFT"/>
                    </a>

                    <ul className="col-xl-auto nav h-100 d-none d-xl-flex justify-content-center flex-nowrap flex-grow-1">
                        {props.categories.map((category) => (
                            category.enable ? (
                                <li className="nav-item" key={category.link}>
                                    <a href={`/c/${category.link}`}
                                       className="nav-category-item mx-2 text-nowrap">{category.title}</a>
                                </li>
                            ) : null
                        ))}
                    </ul>

                    <div className={'col-10 col-xl-3 col-xxl-3 d-flex align-items-center justify-content-end'}>
                        <div className={'position-relative'}>
                            <input type="text"
                                   className="header-search-field d-none d-sm-block"
                                   placeholder="Search"
                                   value={searchInput}
                                   onInput={handleSearchInput}
                                   aria-label="Search"/>
                            {searchInput && (
                                <div role={'button'} className="clear-search-btn" onClick={clearSearchInput}>
                                    <IconX size={16} stroke={1.5}/>
                                </div>
                            )}
                        </div>

                        <a href={'#'} role="button"
                           className={'header-icon-link d-flex d-sm-none'}>
                            <IconSearch size={24} stroke={1.5}/>
                        </a>

                        <a href={userLink} className={'header-icon-link'}>
                            <IconUser size={24} stroke={1.5}/>
                        </a>

                        <a href={wishlistLink} className={'header-icon-link position-relative'}>
                            <IconHeart size={24} stroke={1.5}/>
                            {props.user?.id && props.wishlist.length > 0 ? (
                                <div className={'header-wishlist-counter'}>
                                    {props.wishlist.length}
                                </div>
                            ) : ''}
                        </a>

                        <a href={'#'} id={'cart-icon'}
                           className={'header-icon-link position-relative'}
                           data-bs-toggle="modal"
                           data-bs-target="#cartModal">
                            <IconShoppingCart size={24} stroke={1.5}/>
                            {props.order && props.order.order_items ? (
                                <div className={'header-cart-counter'}>
                                    {props.order.totalQuantity}
                                </div>
                            ) : ''}
                        </a>

                        <a href={'#'} id={'mobile-menu-icon'} role="button"
                           className={'header-icon-link d-flex d-xl-none'}
                           data-bs-toggle="modal"
                           data-bs-target="#mobileMenuModal">
                            <IconMenu2 size={24} stroke={1.5}/>
                        </a>
                    </div>

                </div>
            </div>

            {searchResults && searchResults.length > 0 ? (
                <>
                    <div className={'container-fluid px-3 px-xl-4 px-xxl-5 border-top'}>
                        <div className={'row pt-4'}>
                            {searchResults.map((product) => (
                                <div key={product.id} className={'col-4 col-lg-3 col-xxl-2'}>
                                    <ProductSquare key={product.id} product={product} maxWidth={false}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <>
                </>
            )}
        </header>
    );
};

const mapStateToProps = (state: {
    cart: { order: Order },
    user: { user: User },
    wishlist: { wishlist: Product[] }
}) => ({
    user: state.user.user,
    order: state.cart.order,
    wishlist: state.wishlist.wishlist
})

export default connect(mapStateToProps)(Header);