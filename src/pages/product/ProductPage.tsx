import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import Breadcrumb from "../../components/page-containers/Breadcrumb";
import axios from "axios";
import {Product} from "../../models/product";
import {useParams} from "react-router-dom";
import ProductSlider from "./ProductSlider";
import ProductMainData from "./ProductMainData";
import '../../css/product-page.css';

const ProductPage = () => {
    const {link} = useParams();
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get(`products/${link}`);

                    setProduct(data);
                } catch (error) {
                    console.log('');
                }
            }
        )();
    }, [link]);

    const breadcrumb = [
        {label: 'Home', link: '/'},
        {label: product ? product.category.title : '', link: product ? '/c/' + product.category.link : ''},
        {label: product ? product.title : '', link: product ? product.link : ''},
    ];

    return (
        <Layout>
            <Breadcrumb breadcrumb={breadcrumb}/>

            <div className={'container my-5'}>
                <div className={'row'}>
                    <div className={'col-lg-7'}>
                        <ProductSlider images={product? product.images : null}/>
                    </div>
                    <div className={'col-lg-5'}>
                        {product ? (
                            <ProductMainData product={product}/>
                        ) : ''}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductPage;
