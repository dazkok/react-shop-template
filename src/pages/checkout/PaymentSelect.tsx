import React, {Dispatch, SyntheticEvent, useEffect, useState} from 'react';
import {connect} from "react-redux";
import AlertComponent from "../../components/alerts/Alerts";
import {handleApiError} from "../../components/handlers/apiErrorHandler";
import {Order} from "../../models/order";
import {updateOrderMainData} from "../../redux/actions/cartActions";

const PaymentDetailsForm = (props: {
    order: Order,
    updateOrderMainData: (mainData: Partial<Order>) => void
}) => {
    const [first_name, setFirstName] = useState('');

    const [dataFormErrors, setDataFormErrors] = useState<Record<string, string[]>>({});

    useEffect(() => {
        // setFirstName(props.order.first_name || props.user?.first_name || '');
        // setLastName(props.order.last_name || props.user?.last_name || '');
    }, [props.order]);

    const handleSaveButtonClick = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            // const {data} = await axios.put('order/save-main-data', {
            //
            // })

            // props.updateOrderMainData(data)
            setDataFormErrors({});
        } catch (error: any) {
            handleApiError(error, setDataFormErrors);
        }
    }

    return (
        <>

        </>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    updateOrderMainData: (mainData: Partial<Order>) => dispatch(updateOrderMainData(mainData)),
});

export default connect(mapDispatchToProps)(PaymentDetailsForm);
