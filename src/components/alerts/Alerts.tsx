import React from 'react';
import {IconAlertCircle, IconInfoSquareRoundedFilled} from "@tabler/icons-react";
import '../../css/alerts.css';

const AlertComponent = (props: { message: string, alert_type: string }) => {
    if (props.alert_type === 'success') {
        return (
            <div className={'global-alert global-alert-success'} role={'alert'}>
                <IconInfoSquareRoundedFilled />&nbsp;&nbsp;{props.message}
            </div>
        );
    } else if (props.alert_type === 'danger') {
        return (
            <div className={'global-alert global-alert-danger'} role={'alert'}>
                <IconAlertCircle stroke={1.5}/>&nbsp;&nbsp;{props.message}
            </div>
        );
    } else {
        return null;
    }
};

export default AlertComponent;