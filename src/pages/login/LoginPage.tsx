import React, {SyntheticEvent, useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import Breadcrumb from "../../components/page-containers/Breadcrumb";
import {IconDiscount2, IconFileInvoice, IconHotelService} from "@tabler/icons-react";
import axios from "axios";
import {Navigate} from "react-router-dom";
import AlertComponent from "../../components/alerts/Alerts";
import {User} from "../../models/user";
import {connect} from "react-redux";

const LoginPage = (props: { user: User }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [redirectTo, setRedirectTo] = useState('/');
    const [errorType, setErrorType] = useState('');

    const breadcrumb = [
        {label: 'Home', link: '/'},
        {label: 'Login', link: ''},
    ];

    useEffect(() => {
        if (props.user?.id) {
            setRedirectTo('/account');
            setRedirect(true);
        }
    }, [props.user]);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await axios.post('login', {
                email,
                password
            });

            setRedirect(true);
        } catch (e) {
            setErrorType('danger');
        } finally {
            setTimeout(() => {
                setErrorType('');
            }, 3000)
        }
    }

    if (redirect) {
        return <Navigate to={redirectTo}/>
    }

    return (
        <Layout>
            <Breadcrumb breadcrumb={breadcrumb}/>

            <div className={'container my-5 py-lg-5'}>
                <div className={'row'}>
                    <div className={'col-lg-6'}>
                        <div className={'global-title-3 text-center mb-4'}>
                            I already have an account
                        </div>

                        <div className="d-flex flex-column w-100 gap-1 px-md-5 mb-3">
                            <label htmlFor="email" className="global-label">Email address:</label>
                            <input id="email"
                                   type="email"
                                   value={email}
                                   onChange={e => setEmail(e.target.value)}
                                   className="form-control global-input"
                                   placeholder="Email"/>
                        </div>

                        <div className="d-flex flex-column w-100 gap-1 px-md-5">
                            <label htmlFor="password" className="global-label">Password:</label>
                            <input id="password" type="password"
                                   value={password}
                                   onChange={e => setPassword(e.target.value)}
                                   className="form-control global-input"
                                   placeholder="Password"/>
                        </div>

                        <div className="px-md-5 mt-3">
                            <AlertComponent message={'Wrong email or password!'} alert_type={errorType}/>
                        </div>

                        <div className="w-100 px-md-5 mt-4">
                            <button onClick={submit} className="btn global-button w-100" type="button">Login</button>
                            <div className={'text-end mt-1'}>
                                <a className={'nav-small-menu-item'} href={'#'}>Forgot your password?</a>
                            </div>
                        </div>
                    </div>

                    <div className={'col-lg-6 mt-5 mt-lg-0'}>
                        <div className={'global-title-3 text-center mb-4'}>
                            I'm here for the first time
                        </div>

                        <div className="w-100 px-md-5">
                            <a href={'/register'} className="btn global-button w-100" type="button">Sign up</a>
                        </div>

                        <div className="w-100 px-md-5 mt-5">
                            <div className={'global-subtitle'}>
                                Why it's worth having an account:
                            </div>

                            <div className={'d-flex flex-column align-items-start pt-4'}>
                                <div className={'d-flex align-items-center global-label'}>
                                    <IconDiscount2 stroke={1.7}/>&nbsp;Additional discounts and promotions
                                </div>
                                <div className={'d-flex align-items-center global-label my-2'}>
                                    <IconFileInvoice stroke={1.7}/>&nbsp;Order history
                                </div>
                                <div className={'d-flex align-items-center global-label'}>
                                    <IconHotelService stroke={1.7}/>&nbsp;Service support
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

const mapStateToProps = (state: { user: { user: User } }) => ({
    user: state.user.user
})

export default connect(mapStateToProps)(LoginPage);
