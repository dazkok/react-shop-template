import React from 'react';
import {Category} from "../models/category";
import {Page} from "../models/page";

const MobileMenuModal = (props: { categories: Category[], pages: Page[] }) => {
    return (
        <div className="modal fade" id="mobileMenuModal" aria-labelledby="mobileMenuModalLabel"
             aria-hidden="true">
            <div className="modal-dialog mobile-menu-dialog">
                <div className="modal-content mobile-menu-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body px-0">
                        <div className={'d-flex flex-column align-items-start'}>
                            {props.categories.map((category) => (
                                <a key={category.id} href={`/c/${category.link}`} className={'mobile-menu-item'}>
                                    {category.title}
                                </a>
                            ))}
                        </div>

                        <div className={'d-md-none'}>
                            <hr/>
                            <div className={'d-flex flex-column align-items-start'}>
                                {props.pages.map((page) => (
                                    (page.position === 'header' || page.position === 'header_footer') && page.enable ? (
                                        <a key={page.link} href={`/${page.link}`}
                                           className="mobile-small-menu-item w-100 text-start">{page.title}</a>
                                    ) : null
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer border-top-0">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenuModal;
