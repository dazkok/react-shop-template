import React from 'react';

const DefaultLoader = (props: { height: string }) => {

    return (
        <div style={{height: props.height}}
             className={'d-flex align-items-center justify-content-center'}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default DefaultLoader;
