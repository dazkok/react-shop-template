import React from 'react';
import Breadcrumb from "../../../components/page-containers/Breadcrumb";
import AccountNavigation from "../AccountNavigation";
import Layout from "../../../components/Layout";
import {Product} from "../../../models/product";
import {connect} from "react-redux";
import WishlistProduct from "./WishlistProduct";
import {User} from "../../../models/user";

const WishlistPage = (props: { wishlist: Product[], user: User }) => {
    const breadcrumb = [
        {label: 'Home', link: '/'},
        {label: 'Wishlist', link: ''},
    ];

    return (
        <Layout>
            <Breadcrumb breadcrumb={breadcrumb}/>

            <div className={'container my-5'}>
                <div className={'row text-start'}>
                    <div className={'col-3'}>
                        <div className={'global-title-3 mb-3'}>My Account</div>

                        <AccountNavigation/>
                    </div>

                    <div className={'col-9'}>
                        <h1 className={'global-title-3 mb-3'}>Wishlist</h1>

                        {props.user?.id ? (
                            props.wishlist.length > 0 ? (
                                <div className={'row'}>
                                    {props.wishlist.map((product: Product) => (
                                        <WishlistProduct key={product.id} product={product}/>
                                    ))}
                                </div>
                            ) : (
                                <>
                                    Your wishlist is currently empty :(
                                </>
                            )
                        ) : (
                            <div style={{height: '300px'}}
                                 className={'d-flex align-items-center justify-content-center'}>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const mapStateToProps = (state: { wishlist: { wishlist: Product[] }, user: { user: User } }) => ({
    wishlist: state.wishlist.wishlist,
    user: state.user.user
})

export default connect(mapStateToProps)(WishlistPage);