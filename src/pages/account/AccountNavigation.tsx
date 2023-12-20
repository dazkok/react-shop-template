import React from 'react';
import axios from "axios";

const AccountNavigation = () => {

    const logout = async () => {
        await axios.post('logout')
            .then(() => {
                //add here redirect to '/login'
                window.location.href = '/login';
            })
    }

    return (
        <div className={'d-flex flex-column'}>
            <a className={'account-menu-item'} href={'/account'}>My data</a>
            <a className={'account-menu-item'} href={'/account/addresses'}>My addresses</a>
            <a className={'account-menu-item'} href={'/account/orders'}>My orders</a>
            <a className={'account-menu-item'} href={'/account/wishlist'}>My wishlist</a>
            <div role={'button'} className={'account-menu-item'} onClick={logout}>Logout</div>
        </div>
    );
};

export default AccountNavigation;
