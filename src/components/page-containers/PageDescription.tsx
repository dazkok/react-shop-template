import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Page} from "../../models/page";

const PageDescription = (props: {description: string}) => {

    return (
        <div style={{backgroundColor: '#f5f5e5'}}>
            <div className={'container py-5 text-start'}>
                {props.description === '' ? (
                    <div style={{height: '500px'}}
                         className={'d-flex align-items-center justify-content-center'}>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div style={{fontWeight: 300}}
                         dangerouslySetInnerHTML={{__html: props.description ? props.description : ''}}/>
                )}
            </div>
        </div>
    );
};

export default PageDescription;
