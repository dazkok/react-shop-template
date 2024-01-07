import React from 'react';
import {IconDiscount2, IconFileInvoice, IconHotelService} from "@tabler/icons-react";

const AccountAdvantagesComponent = () => {
    return (
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
    );
};

export default AccountAdvantagesComponent;
