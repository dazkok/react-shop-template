import React from 'react';
import {Page} from "../models/page";
import {Category} from "../models/category";
import {
    IconBrandFacebook,
    IconBrandInstagram, IconBrandTiktok,
} from "@tabler/icons-react";

const Footer = (props: { pages: Page[], categories: Category[] }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto border-top">
            <div className="container py-5">
                <div className="row px-xl-5">
                    <div className="col-6 col-lg-2 mb-3 mb-lg-0 text-start">
                        <div className={'footer-menu-header mb-2'}>Products</div>

                        <ul className="nav flex-column">
                            {props.categories.map((category) => (
                                category.enable ? (
                                    <li className="nav-item mb-2" key={category.id}>
                                        <a href={`/c/${category.link}`}
                                           className="nav-link p-0 footer-menu-item">{category.title}</a>
                                    </li>
                                ) : null
                            ))}
                        </ul>
                    </div>

                    <div className="col-6 col-lg-2 mb-3 mb-lg-0 text-start">
                        <div className={'footer-menu-header mb-2'}>Information</div>

                        <ul className="nav flex-column">
                            {props.pages.map((page) => (
                                (page.position === 'footer' || page.position === 'header_footer') && page.enable ? (
                                    <li className="nav-item mb-2" key={page.id}>
                                        <a href={`/${page.link}`}
                                           className="nav-link p-0 footer-menu-item">{page.title}</a>
                                    </li>
                                ) : null
                            ))}
                        </ul>
                    </div>

                    <div className="col-6 col-lg-2 mb-3 text-start">
                        <div className={'footer-menu-header mb-2'}>Watch us</div>

                        <ul className="nav flex-column">
                            <li className="mb-2">
                                <a href="#"
                                   className="p-0 footer-icon-item">
                                    <IconBrandFacebook size={20} stroke={1.5}/>
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="p-0 footer-icon-item">
                                    <IconBrandInstagram size={20} stroke={1.5}/>
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="p-0 footer-icon-item">
                                    <IconBrandTiktok size={20} stroke={1.5}/>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-5 offset-lg-1 mb-3 mb-lg-0">
                        <form>
                            <h5>Subscribe to our newsletter</h5>
                            <p>Monthly digest of what's new and exciting from us.</p>
                            <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                                <input id="newsletter1" type="text" className="form-control"
                                       placeholder="Email address"/>
                                <button className="btn global-button" type="button">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className={'container-fluid py-3 text-white'}
                 style={{background: '#282c31'}}
            >
                <span className={'footer-bottom-text'}>&copy; Rostmarygift {currentYear}</span>
            </div>
        </footer>
    );
};

export default Footer;
