import React, {Dispatch, SyntheticEvent, useEffect, useState} from 'react';
import {User} from "../../models/user";
import axios from "axios";
import {setUser} from "../../redux/actions/setUserAction";
import {connect} from "react-redux";
import AlertComponent from "../../components/alerts/Alerts";
import {handleApiError} from "../../components/handlers/apiErrorHandler";

const PaymentDetailsForm = (props: { user: User | undefined, setUser: Function }) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [address_additional, setAddressAdditional] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');

    const [same_address, setSameAddress] = useState(true);

    const [invoice_first_name, setInvoiceFirstName] = useState('');
    const [invoice_last_name, setInvoiceLastName] = useState('');
    const [invoice_address, setInvoiceAddress] = useState('');
    const [invoice_zip, setInvoiceZip] = useState('');
    const [invoice_city, setInvoiceCity] = useState('');

    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const [want_invoice, setWantInvoice] = useState(false);
    const [nip, setNip] = useState('');

    const [dataFormErrors, setDataFormErrors] = useState<Record<string, string[]>>({});

    useEffect(() => {
        if (props.user) {
            setFirstName(props.user.first_name);
            setLastName(props.user.last_name);
            setPhone(props.user.phone);
            setEmail(props.user.email);
        }
    }, [props.user]);

    const handleSaveButtonClick = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const {data} = await axios.put('order/save-main-data', {
                first_name,
                last_name,
                address,
                address_additional,
                zip,
                city,
                same_address,
                invoice_first_name,
                invoice_last_name,
                invoice_address,
                invoice_zip,
                invoice_city,
                phone,
                email,
                nip,
                want_invoice
            })

            setDataFormErrors({});
        } catch (error: any) {
            handleApiError(error, setDataFormErrors);
        }
    }

    return (
        <>
            <div>
                {!props.user ? (
                    <>
                        <div className={'mb-4'}>
                            <a href={'/login'} className={'global-link'}>Already have an account? Log in</a>
                        </div>
                    </>
                ) : ''}

                <div className={'global-subtitle text-uppercase mb-4'}>Delivery address</div>

                <div className={'row'}>
                    <div className={'col-lg-6'}>
                        <div className="d-flex flex-column w-100 gap-1 mb-3">
                            <label htmlFor="first_name" className="global-label">First Name *:</label>
                            <input id="first_name"
                                   type="text"
                                   value={first_name}
                                   minLength={2}
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
                    </div>
                    <div className={'col-lg-6'}>
                        <div className="d-flex flex-column w-100 gap-1 mb-3">
                            <label htmlFor="last_name" className="global-label">Last Name *:</label>
                            <input id="last_name"
                                   type="text"
                                   value={last_name}
                                   minLength={2}
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
                    </div>
                </div>

                <div className="d-flex flex-column w-100 gap-1 mb-3">
                    <label htmlFor="address" className="global-label">Address *:</label>
                    <input id="address"
                           type="text"
                           value={address}
                           minLength={2}
                           onChange={e => setAddress(e.target.value)}
                           className="form-control global-input"
                           placeholder="E.g. 3 Koletek Street"/>
                    {dataFormErrors.address && (
                        dataFormErrors.address.map((error, index) => (
                            <AlertComponent key={index} alert_type="danger"
                                            message={error}/>
                        ))
                    )}
                </div>

                <div className="d-flex flex-column w-100 gap-1 mb-3">
                    <label htmlFor="address_additional" className="global-label">Additional information:</label>
                    <input id="address_additional"
                           type="text"
                           value={address_additional}
                           onChange={e => setAddressAdditional(e.target.value)}
                           className="form-control global-input"
                           placeholder="E.g. Company, Premises."/>
                </div>

                <div className={'row'}>
                    <div className={'col-lg-6'}>
                        <div className="d-flex flex-column w-100 gap-1 mb-3">
                            <label htmlFor="zip" className="global-label">Postal code *:</label>
                            <input id="zip"
                                   type="text"
                                   value={zip}
                                   minLength={2}
                                   onChange={e => setZip(e.target.value)}
                                   className="form-control global-input"
                                   placeholder="E.g. 05-332"/>
                            {dataFormErrors.zip && (
                                dataFormErrors.zip.map((error, index) => (
                                    <AlertComponent key={index} alert_type="danger"
                                                    message={error}/>
                                ))
                            )}
                        </div>
                    </div>
                    <div className={'col-lg-6'}>
                        <div className="d-flex flex-column w-100 gap-1 mb-3">
                            <label htmlFor="city" className="global-label">City *:</label>
                            <input id="city"
                                   type="text"
                                   value={city}
                                   minLength={2}
                                   onChange={e => setCity(e.target.value)}
                                   className="form-control global-input"
                                   placeholder="E.g. Warsaw"/>
                            {dataFormErrors.city && (
                                dataFormErrors.city.map((error, index) => (
                                    <AlertComponent key={index} alert_type="danger"
                                                    message={error}/>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-100 mt-4 form-check text-start global-check ps-0">
                    <input type="checkbox" className="form-check-input global-check-input" id="regulation"
                           checked={same_address}
                           onChange={e => setSameAddress(e.target.checked)}/>
                    <label className="form-check-label ms-2 global-text" htmlFor="regulation">
                        The delivery address and invoicing address are the same.
                    </label>
                </div>

                {!same_address ? (
                    <>
                        <div className={'global-subtitle text-uppercase my-4'}>Invoice address</div>

                        <div className={'row'}>
                            <div className={'col-lg-6'}>
                                <div className="d-flex flex-column w-100 gap-1 mb-3">
                                    <label htmlFor="invoice_first_name" className="global-label">First Name *:</label>
                                    <input id="invoice_first_name"
                                           type="text"
                                           value={invoice_first_name}
                                           minLength={2}
                                           onChange={e => setInvoiceFirstName(e.target.value)}
                                           className="form-control global-input"
                                           placeholder="First Name"/>
                                    {dataFormErrors.invoice_first_name && (
                                        dataFormErrors.invoice_first_name.map((error, index) => (
                                            <AlertComponent key={index} alert_type="danger"
                                                            message={error}/>
                                        ))
                                    )}
                                </div>
                            </div>
                            <div className={'col-lg-6'}>
                                <div className="d-flex flex-column w-100 gap-1 mb-3">
                                    <label htmlFor="invoice_last_name" className="global-label">Last Name *:</label>
                                    <input id="invoice_last_name"
                                           type="text"
                                           value={invoice_last_name}
                                           minLength={2}
                                           onChange={e => setInvoiceLastName(e.target.value)}
                                           className="form-control global-input"
                                           placeholder="Last Name"/>
                                    {dataFormErrors.invoice_last_name && (
                                        dataFormErrors.invoice_last_name.map((error, index) => (
                                            <AlertComponent key={index} alert_type="danger"
                                                            message={error}/>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-column w-100 gap-1 mb-3">
                            <label htmlFor="invoice_address" className="global-label">Address *:</label>
                            <input id="invoice_address"
                                   type="text"
                                   value={invoice_address}
                                   minLength={2}
                                   onChange={e => setInvoiceAddress(e.target.value)}
                                   className="form-control global-input"
                                   placeholder="E.g. 3 Koletek Street"/>
                            {dataFormErrors.invoice_address && (
                                dataFormErrors.invoice_address.map((error, index) => (
                                    <AlertComponent key={index} alert_type="danger"
                                                    message={error}/>
                                ))
                            )}
                        </div>

                        <div className={'row'}>
                            <div className={'col-lg-6'}>
                                <div className="d-flex flex-column w-100 gap-1 mb-3">
                                    <label htmlFor="invoice_zip" className="global-label">Postal code *:</label>
                                    <input id="invoice_zip"
                                           type="text"
                                           value={invoice_zip}
                                           minLength={2}
                                           onChange={e => setInvoiceZip(e.target.value)}
                                           className="form-control global-input"
                                           placeholder="E.g. 05-332"/>
                                    {dataFormErrors.invoice_zip && (
                                        dataFormErrors.invoice_zip.map((error, index) => (
                                            <AlertComponent key={index} alert_type="danger"
                                                            message={error}/>
                                        ))
                                    )}
                                </div>
                            </div>
                            <div className={'col-lg-6'}>
                                <div className="d-flex flex-column w-100 gap-1 mb-3">
                                    <label htmlFor="invoice_city" className="global-label">City *:</label>
                                    <input id="invoice_city"
                                           type="text"
                                           value={invoice_city}
                                           minLength={2}
                                           onChange={e => setInvoiceCity(e.target.value)}
                                           className="form-control global-input"
                                           placeholder="E.g. Warsaw"/>
                                    {dataFormErrors.invoice_city && (
                                        dataFormErrors.invoice_city.map((error, index) => (
                                            <AlertComponent key={index} alert_type="danger"
                                                            message={error}/>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                ) : ''}

                <div className="w-100 mt-4 form-check text-start global-check ps-0">
                    <input type="checkbox" className="form-check-input global-check-input" id="want_invoice"
                           checked={want_invoice}
                           onChange={e => setWantInvoice(e.target.checked)}/>
                    <label className="form-check-label ms-2 global-text" htmlFor="want_invoice">
                        Please issue a VAT invoice
                    </label>
                </div>

                {want_invoice ? (
                    <>
                        <div className="d-flex flex-column w-100 gap-1 my-3">
                            <label htmlFor="address_additional" className="global-label">NIP *:</label>
                            <input id="address_additional"
                                   type="text"
                                   value={nip}
                                   onChange={e => setNip(e.target.value)}
                                   className="form-control global-input"
                                   placeholder=""/>
                            {dataFormErrors.nip && (
                                dataFormErrors.nip.map((error, index) => (
                                    <AlertComponent key={index} alert_type="danger"
                                                    message={error}/>
                                ))
                            )}
                        </div>
                    </>
                ) : ''}

                <div className={'global-subtitle text-uppercase my-4'}>Contact information</div>

                <div className="d-flex flex-column w-100 gap-1 mb-3">
                    <label htmlFor="phone" className="global-label">Phone *:</label>
                    <input id="phone"
                           type="text"
                           value={phone}
                           maxLength={15}
                           minLength={9}
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

                <div className="d-flex flex-column w-100 gap-1 my-3">
                    <label htmlFor="email" className="global-label">Email *:</label>
                    <input id="email"
                           type="text"
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
            </div>

            <button type={'button'}
                    className={'btn global-button w-100 text-start mt-4'}
                    onClick={handleSaveButtonClick}
            >
                Continue
            </button>
        </>
    );
};

const mapStateToProps = (state: { user: { user: User } }) => ({
    user: state.user.user
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(setUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetailsForm);
