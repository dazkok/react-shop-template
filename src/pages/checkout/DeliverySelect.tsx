import React, {Dispatch, SyntheticEvent, useEffect, useState} from 'react';
import {connect} from "react-redux";
import AlertComponent from "../../components/alerts/Alerts";
import {handleApiError} from "../../components/handlers/apiErrorHandler";
import {Order} from "../../models/order";
import {updateOrderMainData} from "../../redux/actions/cartActions";
import axios from "axios";

const DeliverySelect = (props: {
    order: Order,
    updateOrderMainData: (mainData: Partial<Order>) => void
}) => {
    const [selectedPoint, setSelectedPoint] = useState<any>(null);

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
            <div className={'mt-3'}>
                <div className="form-check form-check-inline w-100 m-0">
                    <input className="form-check-input global-radio"
                           type="radio"
                           name="delivery_id"
                           id="inpost_parcel"
                           value="0"
                    />
                    <label className="form-check-label w-100" htmlFor="payu">Inpost Paczkomaty 24/7</label>
                </div>
            </div>
            <div className={'my-3'}>
                {/* Widget InPost */}
                <inpost-geowidget
                    token='https://geowidget.inpost.pl/' // Zastąp prawdziwym tokenem
                    language='pl'
                    config='parcelcollect'
                ></inpost-geowidget>
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    updateOrderMainData: (mainData: Partial<Order>) => dispatch(updateOrderMainData(mainData)),
});

export default connect(mapDispatchToProps)(DeliverySelect);
