import React from 'react';
import {PageElement} from "../../models/element";

const CustomElement = (props: { element: PageElement }) => {
    return (
        <>
            {props.element.style === 'text' ? (
                <div className={'col-12'}>
                    <div className={'global-title-2 mb-3'}>
                        {props.element.title}
                    </div>
                    <div className={'global-text'} dangerouslySetInnerHTML={{__html: props.element.text}}/>
                </div>

            ) : props.element.style === 'image' ? (
                <img src={'http://localhost:8010/images/' + props.element.image} alt={'preview'} width={'100%'}
                     height={'auto'} className={'object-fit-contain'}/>

            ) : props.element.style === 'text-image' ? (
                <>
                    <div className={'col-6 d-flex align-items-start flex-column justify-content-center'}>
                        <div className={'global-title-2 mb-3'}>
                            {props.element.title}
                        </div>
                        <div className={'global-text'} dangerouslySetInnerHTML={{__html: props.element.text}}/>
                    </div>
                    <div className={'col-6'}>
                        <img src={'http://localhost:8010/images/' + props.element.image} alt={'preview'} width={'100%'}
                             height={'auto'} className={'object-fit-contain'}/>
                    </div>
                </>

            ) : props.element.style === 'image-text' ? (
                <>
                    <div className={'col-6'}>
                        <img src={'http://localhost:8010/images/' + props.element.image} alt={'preview'} width={'100%'}
                             height={'auto'} className={'object-fit-contain'}/>
                    </div>
                    <div className={'col-6 d-flex align-items-start flex-column justify-content-center'}>
                        <div className={'global-title-2 mb-3'}>
                            {props.element.title}
                        </div>
                        <div className={'global-text'} dangerouslySetInnerHTML={{__html: props.element.text}}/>
                    </div>
                </>
            ) : props.element.style === 'product-detail' ? (
                <div className={'row'}>
                    <div className={'col-4 d-flex align-items-start flex-column justify-content-center'}>
                        <b>{props.element.title}</b>
                    </div>
                    <div className={'col-8 d-flex align-items-start flex-column justify-content-center'}>
                        <div className={''}>
                            {props.element.additional_field}
                        </div>
                    </div>
                </div>
            ) : 'Style not found'}
        </>
    );
};

export default CustomElement;
