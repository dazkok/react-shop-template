import React, {SyntheticEvent, useState} from 'react';
import Layout from "../../components/Layout";
import Breadcrumb from "../../components/page-containers/Breadcrumb";
import {Navigate} from "react-router-dom";
import axios from "axios";
import AccountAdvantagesComponent from "./AccountAdvantagesComponent";
import AlertComponent from "../../components/alerts/Alerts";

const RegisterPage = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');
    const [regulation, setRegulation] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [dataFormErrors, setDataFormErrors] = useState<Record<string, string[]>>({});

    const breadcrumb = [
        {label: 'Home', link: '/'},
        {label: 'Register', link: ''},
    ];

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await axios.post('register', {
                first_name,
                last_name,
                email,
                password,
                password_confirm,
                regulation
            });

            setDataFormErrors({});
            setRedirect(true);
        } catch (error: any) {
            if (error.response && error.response.data) {
                const errors = error.response.data.errors;
                setDataFormErrors(errors);
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    }

    if (redirect) {
        return <Navigate to={'/login'}/>
    }

    return (
        <Layout>
            <Breadcrumb breadcrumb={breadcrumb}/>

            <div className={'container my-5'}>
                <div className={'row'}>
                    <div className={'col-lg-6'}>
                        <h1 className={'global-title-3 text-center mb-4'}>
                            Sign up
                        </h1>

                        <div className="d-flex flex-column w-100 gap-1 px-md-5 mb-3">
                            <label htmlFor="first_name" className="global-label">First Name:</label>
                            <input id="first_name"
                                   type="text"
                                   value={first_name}
                                   onChange={e => setFirstName(e.target.value)}
                                   className="form-control global-input"
                                   placeholder="First Name"/>
                            {dataFormErrors.first_name && (
                                dataFormErrors.first_name.map((error, index) => (
                                    <AlertComponent key={index} alert_type="danger"
                                                    message={error}/>
                                ))
                            )}
                        </div>

                        <div className="d-flex flex-column w-100 gap-1 px-md-5 mb-3">
                            <label htmlFor="last_name" className="global-label">Last Name:</label>
                            <input id="last_name"
                                   type="text"
                                   value={last_name}
                                   onChange={e => setLastName(e.target.value)}
                                   className="form-control global-input"
                                   placeholder="Last Name"/>
                            {dataFormErrors.last_name && (
                                dataFormErrors.last_name.map((error, index) => (
                                    <AlertComponent key={index} alert_type="danger"
                                                    message={error}/>
                                ))
                            )}
                        </div>

                        <div className="d-flex flex-column w-100 gap-1 px-md-5 mb-3">
                            <label htmlFor="email" className="global-label">Email address:</label>
                            <input id="email"
                                   type="email"
                                   value={email}
                                   onChange={e => setEmail(e.target.value)}
                                   className="form-control global-input"
                                   placeholder="Email"/>
                            {dataFormErrors.email && (
                                dataFormErrors.email.map((error, index) => (
                                    <AlertComponent key={index} alert_type="danger"
                                                    message={error}/>
                                ))
                            )}
                        </div>

                        <div className="d-flex flex-column w-100 gap-1 px-md-5 mb-3">
                            <label htmlFor="phone" className="global-label">Phone:</label>
                            <input id="phone"
                                   type="text"
                                   value={phone}
                                   maxLength={15}
                                   onChange={e => setPhone(e.target.value)}
                                   className="form-control global-input"
                                   placeholder="Phone"/>
                            {dataFormErrors.phone && (
                                dataFormErrors.phone.map((error, index) => (
                                    <AlertComponent key={index} alert_type="danger"
                                                    message={error}/>
                                ))
                            )}
                        </div>

                        <div className="d-flex flex-column w-100 gap-1 px-md-5 mb-3">
                            <label htmlFor="password" className="global-label">Password:</label>
                            <input id="password"
                                   type="password"
                                   value={password}
                                   onChange={e => setPassword(e.target.value)}
                                   className="form-control global-input"
                                   placeholder="Password"/>
                            {dataFormErrors.password && (
                                dataFormErrors.password.map((error, index) => (
                                    <AlertComponent key={index} alert_type="danger"
                                                    message={error}/>
                                ))
                            )}
                        </div>

                        <div className="d-flex flex-column w-100 gap-1 px-md-5 mb-3">
                            <label htmlFor="password_confirm" className="global-label">Password Confirm:</label>
                            <input id="password_confirm"
                                   type="password"
                                   value={password_confirm}
                                   onChange={e => setPasswordConfirm(e.target.value)}
                                   className="form-control global-input"
                                   placeholder="Password Confirm}"/>
                            {dataFormErrors.password_confirm && (
                                dataFormErrors.password_confirm.map((error, index) => (
                                    <AlertComponent key={index} alert_type="danger"
                                                    message={error}/>
                                ))
                            )}
                        </div>

                        <div className="w-100 px-md-5 mt-4">
                            <button onClick={submit} className="btn global-button w-100" type="button">Register</button>
                        </div>

                        <div className="w-100 px-md-5 mt-4 form-check text-start global-check ps-0">
                            <input type="checkbox" className="form-check-input global-check-input" id="regulation"
                                   checked={regulation}
                                   onChange={e => setRegulation(e.target.checked)}/>
                            <label className="form-check-label ms-2 global-text" htmlFor="regulation">
                                *I accept the Shop <a className={'global-link'} href={'#'}>Terms and
                                conditions</a> and <a className={'global-link'} href={'#'}>Privacy Policy</a>.
                            </label>
                        </div>
                        {dataFormErrors.regulation && (
                            dataFormErrors.regulation.map((error, index) => (
                                <div className="w-100 px-md-5 mt-2">
                                    <AlertComponent key={index} alert_type="danger"
                                                    message={error}/>
                                </div>

                            ))
                        )}
                    </div>

                    <div className={'col-lg-6'}>
                        <AccountAdvantagesComponent/>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default RegisterPage;
