import React, {useEffect, useState} from 'react';
import {Category} from "../models/category";
import {IconHeart, IconShoppingCart, IconUser} from "@tabler/icons-react";
import {Order} from "../models/order";
import {connect} from "react-redux";
import {User} from "../models/user";

const Header = (props: { categories: Category[], order: Order, user: User }) => {
    const [userLink, setUserLink] = useState('/login');

    useEffect(() => {
        if (props.user?.id) {
            setUserLink('/account');
        } else {
            setUserLink('/login');
        }
    }, [props.user]);

    return (
        <header className="border-bottom bg-white">
            <div className="container-fluid px-3 px-xl-4 px-xxl-5">
                <div className={'row justify-content-between flex-nowrap'} style={{height: '48px'}}>
                    <a href="/"
                       className="col-auto col-xxl-2 col-xxxl-3 d-flex align-items-center text-decoration-none">
                        <img width="auto" height="60" loading={'lazy'}
                             src="http://localhost:8010/images/page/rostmatygift-logo.png"
                             className="page-logo" alt="ROSTMARYGIFT"/>
                    </a>

                    <ul className="col-md-auto nav h-100 d-flex justify-content-center flex-nowrap flex-grow-1">
                        {props.categories.map((category) => (
                            category.enable ? (
                                <li className="nav-item" key={category.link}>
                                    <a href={`/c/${category.link}`}
                                       className="nav-category-item mx-2 text-nowrap">{category.title}</a>
                                </li>
                            ) : null
                        ))}
                    </ul>

                    <div className={'col-3 col-xxl-3 d-flex align-items-center justify-content-end'}>
                        <input type="text"
                               className=" header-search-field"
                               placeholder="Search"
                               aria-label="Search"/>

                        <a href={userLink} className={'header-icon-link'}>
                            <IconUser size={24} stroke={1.5}/>
                        </a>

                        <a href={'#'} className={'header-icon-link position-relative'}>
                            <IconHeart size={24} stroke={1.5}/>
                            {props.order.order_items ? (
                                <div className={'header-wishlist-counter'}>
                                    {props.order.order_items ? props.order.order_items.length : 0}
                                </div>
                            ) : ''}
                        </a>

                        <a href={'#'} id={'cart-icon'}
                           className={'header-icon-link position-relative'}
                           data-bs-toggle="modal" data-bs-target="#cartModal">
                            <IconShoppingCart size={24} stroke={1.5}/>
                            {props.order.order_items ? (
                                <div className={'header-cart-counter'}>
                                    {props.order.order_items ? props.order.order_items.length : 0}
                                </div>
                            ) : ''}
                        </a>
                    </div>

                </div>
            </div>
        </header>
    );
};

const mapStateToProps = (state: { cart: { order: Order }, user: { user: User } }) => ({
    user: state.user.user,
    order: state.cart.order
})

export default connect(mapStateToProps)(Header);