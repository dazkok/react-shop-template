import React from 'react';
import {BreadcrumbItem} from "../../models/breadcrumb-item";
import '../../css/breadcrumb.css';

const Breadcrumb = (props: { breadcrumb: BreadcrumbItem[] }) => {
    return (
        <div className={'container my-5'}>
            <div className={'d-flex'}>
                {props.breadcrumb.map((item, index) => (
                    index === props.breadcrumb.length - 1 ? (
                        <span key={index} style={{fontWeight: 300}}>{item.label}</span>
                    ) : (
                        <span key={index}>
                            <a className={'breadcrumb-item me-2'} href={item.link}>
                                {item.label}
                            </a>
                            <span className={'me-2'} style={{fontWeight: 300}}>/</span>
                        </span>
                    )
                ))}
            </div>
        </div>
    );
};

export default Breadcrumb;
