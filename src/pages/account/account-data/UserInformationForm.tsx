import React, {Dispatch, SyntheticEvent, useEffect, useState} from 'react';
import AlertComponent from "../../../components/alerts/Alerts";
import {User} from "../../../models/user";
import axios from "axios";
import {setUser} from "../../../redux/actions/setUserAction";
import {connect} from "react-redux";

const UserInformationForm = (props: { user: User, setUser: Function }) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [dataFormErrors, setDataFormErrors] = useState<Record<string, string[]>>({});

    useEffect(() => {
        setFirstName(props.user.first_name);
        setLastName(props.user.last_name);
        setEmail(props.user.email);
        setPhone(props.user.phone);
    }, [props.user]);

    const handleEditButtonClick = () => {
        setIsEditMode(true);
    }

    const handleSaveButtonClick = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const {data} = await axios.put('users/info', {
                first_name,
                last_name,
                phone
            })

            props.setUser(data);
            setIsEditMode(false);
            setDataFormErrors({});
        } catch (error: any) {
            if (error.response && error.response.data) {
                const errors = error.response.data.errors;
                setDataFormErrors(errors);
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    }

    return (
        <>
            <div>
                <div className={'global-subtitle mb-3'}>User information</div>

                {!isEditMode ? (
                    <div id={'data-preview'}>
                        {props.user.first_name} {props.user.last_name}
                        <br/>
                        {props.user.email}
                        <br/>
                        {props.user.phone}
                    </div>
                ) : (
                    <>
                        <div className="d-flex flex-column w-100 gap-1 mb-3">
                            <label htmlFor="first_name" className="global-label">First Name:</label>
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

                        <div className="d-flex flex-column w-100 gap-1 mb-3">
                            <label htmlFor="last_name" className="global-label">Last Name:</label>
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

                        <div className="d-flex flex-column w-100 gap-1 mb-3">
                            <label htmlFor="email" className="global-label">Email address:</label>
                            <input id="email"
                                   type="email"
                                   disabled
                                   value={email}
                                   onChange={e => setEmail(e.target.value)}
                                   className="form-control global-input"
                                   placeholder="Email"/>
                        </div>

                        <div className="d-flex flex-column w-100 gap-1">
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
                    </>
                )}
            </div>

            {!isEditMode ? (
                <button type={'button'}
                        className={'btn global-button w-100 text-start mt-4'}
                        onClick={handleEditButtonClick}
                >
                    Change data
                </button>
            ) : (
                <button type={'button'}
                        className={'btn global-button w-100 text-start mt-4'}
                        onClick={handleSaveButtonClick}
                >
                    Save
                </button>
            )}
        </>
    );
};

const mapStateToProps = (state: { user: { user: User } }) => ({
    user: state.user.user
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(setUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInformationForm);
