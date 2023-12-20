import React, {SyntheticEvent, useState} from 'react';
import axios from "axios";
import AlertComponent from "../../../components/alerts/Alerts";

const PasswordForm = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [dataFormErrors, setDataFormErrors] = useState<Record<string, string[]>>({});
    const [successAlert, setSuccessAlert] = useState(false);
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');

    const handleEditButtonClick = () => {
        setIsEditMode(true);
    }

    const handleSaveButtonClick = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await axios.put('users/password', {
                password,
                password_confirm
            })

            setPassword('');
            setPasswordConfirm('');
            setIsEditMode(false);
            setDataFormErrors({});
            setSuccessAlert(true);

            setTimeout(() => {
                setSuccessAlert(false);
            }, 3000);
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
                <div className={'global-subtitle mb-3'}>Password</div>


                {!isEditMode ? (
                    <>
                        <div>**********</div>
                        {successAlert ? (
                            <AlertComponent alert_type="success"
                                            message={'The password has been successfully changed.'}/>
                        ) : ''}
                    </>
                ) : (
                    <>
                        <div className="d-flex flex-column w-100 gap-1 mb-3">
                            <label htmlFor="password" className="global-label">Password:</label>
                            <input id="password"
                                   type="password"
                                   value={password}
                                   minLength={2}
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

                        <div className="d-flex flex-column w-100 gap-1">
                            <label htmlFor="password_confirm" className="global-label">Password confirm:</label>
                            <input id="password_confirm"
                                   type="password"
                                   value={password_confirm}
                                   minLength={2}
                                   onChange={e => setPasswordConfirm(e.target.value)}
                                   className="form-control global-input"
                                   placeholder="Password confirm"/>
                            {dataFormErrors.password_confirm && (
                                dataFormErrors.password_confirm.map((error, index) => (
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
                    Change password
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

export default PasswordForm;
