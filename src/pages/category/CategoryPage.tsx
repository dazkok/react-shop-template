import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import {useParams} from "react-router-dom";
import Breadcrumb from "../../components/page-containers/Breadcrumb";
import {Category} from "../../models/category";
import axios from "axios";
import PageDescription from "../../components/page-containers/PageDescription";
import {Product} from "../../models/product";
import CategoryProducts from "./CategoryProducts";

const CategoryPage = () => {
    const {link} = useParams();
    const [category, setCategory] = useState<Category>();
    const [products, setProducts] = useState<Product[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get(`categories/${link}`);

                    setCategory(data);

                    setTimeout(() => {
                        setLoading(false);
                    }, 3000);
                } catch (error) {
                    setLoading(false);
                    console.log('');
                }
            }
        )();
    }, [link]);

    useEffect(() => {
        (
            async () => {
                try {
                    if (category) {
                        const {data} = await axios.get(`products/${category.id}/frontend`);

                        setProducts(data);
                    }
                } catch (error) {
                    console.log('');
                }
            }
        )();
    }, [category]);

    const breadcrumb = [
        {label: 'Home', link: '/'},
        {label: category ? category.title : '', link: ''},
    ];

    return (
        <Layout>
            <Breadcrumb breadcrumb={breadcrumb}/>
            <CategoryProducts products={products} loading={loading}/>
            <PageDescription description={category ? category.description : ''}/>
        </Layout>
    );
};

export default CategoryPage;
