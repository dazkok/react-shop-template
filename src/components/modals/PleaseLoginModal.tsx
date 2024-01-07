import React from 'react';
import '../../css/please-login.css';

const PleaseLoginModal = () => {
    return (
        <div className="modal fade" id="pleaseLoginModal" aria-labelledby="pleaseLoginModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content login-modal-content">
                    <div className="modal-header border-bottom-0 mt-3">
                        <div className="global-title-3" id="pleaseLoginModalLabel">Log in to add to wish list</div>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body mb-3">
                        <a href={'/login'} className="btn global-button w-100" type="button">Login</a>

                        <div className={'global-title-3 mt-5'}>Are you a new customer?</div>
                        <a href={'/register'} className="btn global-button global-secondary-button w-100 mt-3"
                           type="button">Register</a>
                        <div className={'my-2 text-start'} style={{color: "black"}}>or</div>
                        <button className="btn global-button global-secondary-button w-100" type="button" data-bs-dismiss="modal">
                            Keep buying without logging in
                        </button>
                    </div>
                    {/*<div className="modal-footer">*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
};

export default PleaseLoginModal;
