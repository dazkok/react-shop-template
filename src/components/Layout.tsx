import React, {Dispatch, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {setUser} from "../redux/actions/setUserAction";
import axios from "axios";
import Header from "./Header";
import Nav from "./Nav";
import {Page} from "../models/page";
import {User} from "../models/user";
import {Category} from "../models/category";
import '../css/layout.css';
import GlobalNotify from "./GlobalNotify";
import Footer from "./Footer";
import CartModalComponent from "./cart-modal/CartModalComponent";

const Layout = (props: any) => {
    const [pages, setPages] = useState<Page[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get('pages/leveled');

                    setPages(data);
                } catch (error) {
                    console.log('');
                }
            }
        )();
    }, []);

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get('categories');

                    setCategories(data);
                } catch (error) {
                    console.log('');
                }
            }
        )();
    }, []);

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get('user');

                    props.setUser(data);
                } catch (error) {
                    console.log('');
                }
            }
        )();
    }, []);

    return (
        <div className={'d-flex flex-column min-vh-100'}>
            <div className={'fixed-top my-navbar'}>
                <GlobalNotify/>
                <Nav pages={pages}/>
                <Header categories={categories}/>
            </div>

            <main>
                {props.children}
            </main>

            <CartModalComponent/>

            <Footer pages={pages} categories={categories}/>
        </div>
    );
};

const mapStateToProps = (state: { user: { user: User } }) => ({
    user: state.user.user
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(setUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
