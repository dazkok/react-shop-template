import React from 'react';
import {Page} from "../models/page";

const Nav = (props: { pages: Page[] }) => {

    return (
        <nav className="py-1 bg-white d-none d-md-block" style={{height: '32px'}}>
            <div className="container-fluid d-flex justify-content-end px-5">
                <ul className="nav">
                    {props.pages.map((page) => (
                        (page.position === 'header' || page.position === 'header_footer') && page.enable ? (
                            <li className="nav-item" key={page.link}>
                                <a href={`/${page.link}`} className="nav-small-menu-item ps-4">{page.title}</a>
                            </li>
                        ) : null
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Nav;
