import React from 'react';

const AdvantageBox = (props: { image: string, title: string, text: string }) => {
    return (
        <div className="row advantage-box">
            <div className="col-4 d-flex align-items-center">
                <img src={`http://localhost:8010/images/${props.image}`}
                     alt={''}
                     className={'object-fit-contain'}
                     width={'100%'}
                     height={'auto'}
                     loading={'lazy'}/>
            </div>
            <div className="col-8 d-flex flex-column align-items-start justify-content-center text-start">
                <div className="advantage-title mb-2">{props.title}</div>
                <div className="advantage-text" dangerouslySetInnerHTML={{__html: props.text}}/>
            </div>
        </div>
    );
};

export default AdvantageBox;