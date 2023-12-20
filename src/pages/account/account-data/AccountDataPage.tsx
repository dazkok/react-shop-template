import React from 'react';
import '../../../css/account.css';
import Layout from "../../../components/Layout";
import Breadcrumb from "../../../components/page-containers/Breadcrumb";
import AccountNavigation from "../AccountNavigation";
import UserInformationForm from "./UserInformationForm";
import PasswordForm from "./PasswordForm";
import {User} from "../../../models/user";
import {connect} from "react-redux";

const AccountDataPage = (props: { user: User }) => {
    const breadcrumb = [
        {label: 'Home', link: '/'},
        {label: 'Account data', link: ''},
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
                        <h1 className={'global-title-3'}>Account data</h1>

                        {props.user?.id ? (
                            <div className={'row mt-3'}>
                                <div className={'col-6 d-flex flex-column justify-content-between pe-lg-5'}>
                                    <UserInformationForm/>
                                </div>

                                <div className={'col-6 d-flex flex-column justify-content-between pe-lg-5'}>
                                    <PasswordForm/>
                                </div>
                            </div>
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

const mapStateToProps = (state: { user: { user: User } }) => ({
    user: state.user.user
})

export default connect(mapStateToProps)(AccountDataPage);