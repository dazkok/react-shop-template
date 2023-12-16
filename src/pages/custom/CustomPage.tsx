import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import {useParams} from "react-router-dom";
import {PageElement} from "../../models/element";
import axios from "axios";
import CustomElement from "./CustomElement";
import {Page} from "../../models/page";
import Breadcrumb from "../../components/page-containers/Breadcrumb";

const CustomPage = () => {
    const {link} = useParams();
    const [page, setPage] = useState<Page>();
    const [pageElements, setPageElements] = useState<PageElement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get(`pages/${link}`);

                    setPage(data);
                    setLoading(false);
                } catch (error) {
                    console.log('');
                    setLoading(false);
                }
            }
        )();
    }, [link]);

    useEffect(() => {
        if (page) {
            (
                async () => {
                    try {
                        const {data} = await axios.get(`elements/page-${page.id}`);

                        setPageElements(data);
                        setLoading(false);
                    } catch (error) {
                        console.log('');
                        setLoading(false);
                    }
                }
            )();
        }
    }, [page]);

    const breadcrumb = [
        {label: 'Home', link: '/'},
        {label: page ? page.title : '', link: ''},
    ];

    return (
        <Layout>
            <Breadcrumb breadcrumb={breadcrumb}/>

            {loading ? (
                <div style={{height: '800px'}}
                     className={'d-flex align-items-center justify-content-center'}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className={'container my-5'}>
                    {
                        Array.isArray(pageElements) ? (
                            pageElements.map((pageElement) => (
                                <div className={'row my-4'}>
                                    <CustomElement key={pageElement.id} element={pageElement}/>
                                </div>
                            ))
                        ) : (
                            <div>Page elements are not available</div>
                        )
                    }
                </div>
            )}
        </Layout>
    );
};

export default CustomPage;
