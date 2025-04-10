import React, {Dispatch, SyntheticEvent, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {handleApiError} from "../../components/handlers/apiErrorHandler";
import {Order} from "../../models/order";
import {updateOrderMainData} from "../../redux/actions/cartActions";
import axios from "axios";
import {PayMethod} from "../../models/pay-method";

const PaymentSelect = (props: {
    order: Order,
    updateOrderMainData: (mainData: Partial<Order>) => void
}) => {
    const [payMethods, setPayMethods] = useState<PayMethod[]>();

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

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get(`pay-methods`);

                    setPayMethods(data);
                } catch (error) {
                    console.log('');
                }
            }
        )();
    }, []);

    return (
        <>
            <div className={'mt-3'}>
                <div className="form-check form-check-inline w-100 m-0">
                    <input className="form-check-input global-radio"
                           type="radio"
                           name="payment_id"
                           id="payu"
                           value="0"/>
                    <label className="form-check-label w-100" htmlFor="payu">PayU</label>
                </div>

                <div className={'d-flex flex-wrap my-3'}>
                    {payMethods?.map((payMethod) => (
                        <img key={payMethod.value}
                             className={'object-fit-contain mb-3 me-2'}
                             src={payMethod.brandImageUrl}
                             alt={payMethod.name} loading={'lazy'} height={'24px'}/>
                    ))}
                </div>
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    updateOrderMainData: (mainData: Partial<Order>) => dispatch(updateOrderMainData(mainData)),
});

export default connect(mapDispatchToProps)(PaymentSelect);
