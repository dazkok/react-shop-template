import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import Breadcrumb from "../../components/page-containers/Breadcrumb";
import axios from "axios";
import {Product} from "../../models/product";
import {useParams} from "react-router-dom";
import ProductSlider from "./ProductSlider";
import ProductMainData from "./ProductMainData";
import '../../css/product-page.css';
import {PageElement} from "../../models/element";
import CustomElement from "../custom/CustomElement";
import PromotionSection from "../home/PromotionSection";

const ProductPage = () => {
    const {link} = useParams();
    const [product, setProduct] = useState<Product>();
    const [descriptions, setDescriptions] = useState<PageElement[]>([]);
    const [loading, setLoading] = useState(true);
    const [productNotFound, setProductNotFound] = useState(false);

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get(`products/${link}`);

                    setProduct(data);
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        if (error.response?.status === 404) {
                            setProductNotFound(true);
                            // console.log('Product not found.');
                        } else {
                            // console.log('An error occurred:', error.message);
                        }
                    } else {
                        // console.log('An unexpected error occurred:', error);
                    }
                }
            }
        )();
    }, [link]);

    useEffect(() => {
        if (product) {
            (
                async () => {
                    try {
                        const {data} = await axios.get(`elements/product-${product.id}`);

                        setDescriptions(data);
                        setLoading(false);
                    } catch (error) {
                        console.log('');
                        setLoading(false);
                    }
                }
            )();
        }
    }, [product]);

    const breadcrumb = [
        {label: 'Home', link: '/'},
        {label: product ? product.category.title : '', link: product ? '/c/' + product.category.link : ''},
        {label: product ? product.title : '', link: product ? product.link : ''},
    ];

    return (
        <Layout>
            {!productNotFound ?
                <>
                    <Breadcrumb breadcrumb={breadcrumb}/>

                    <div className={'container my-5'}>
                        {loading ? (
                            <div style={{height: '783px'}}
                                 className={'d-flex align-items-center justify-content-center'}>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <div className={'row'}>
                                <div className={'col-lg-7'}>
                                    <ProductSlider images={product ? product.images : null}/>
                                </div>
                                <div className={'col-lg-5'}>
                                    {product ? (
                                        <ProductMainData product={product}/>
                                    ) : ''}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={'container my-5'}>
                        <div className="accordion" id="accordionDescriptions">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne" aria-expanded="true"
                                            aria-controls="collapseOne">
                                        Description
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show"
                                     aria-labelledby="headingOne">
                                    <div className="accordion-body py-0">
                                        {loading ? (
                                            <div style={{height: '500px'}}
                                                 className={'d-flex align-items-center justify-content-center'}>
                                                <div className="spinner-border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        ) : (
                                            Array.isArray(descriptions) ? (
                                                descriptions.map((description) => (
                                                    <div className={'row my-3'} key={description.id}>
                                                        <CustomElement element={description}/>
                                                    </div>
                                                ))
                                            ) : (
                                                <div>Page elements are not available</div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwo" aria-expanded="false"
                                            aria-controls="collapseTwo">
                                        Details
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse"
                                     aria-labelledby="headingTwo">
                                    <div className="accordion-body">
                                        // product details
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseThree" aria-expanded="false"
                                            aria-controls="collapseThree">
                                        Reviews
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse"
                                     aria-labelledby="headingThree">
                                    <div className="accordion-body">
                                        // opinions
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                : <>
                    <div className={'container my-5'}>
                        <div className={'global-title-1 mb-4'}>
                            Couldn't find the product at this address.<br/> Check out our current offers.
                        </div>

                        <button type="button"
                                className="btn global-button global-secondary-button w-100 text-start"
                                data-bs-dismiss="modal">Keep shopping
                        </button>
                    </div>
                </>
            }

            <PromotionSection/>

        </Layout>
    );
};

export default ProductPage;
