import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import HomeSlider from "./HomeSlider";
import '../../css/home.css';
import PromotionSection from "./PromotionSection";
import Advantages from "./Advantages";
import PageDescription from "../../components/page-containers/PageDescription";
import axios from "axios";
import {Page} from "../../models/page";

const HomePage = () => {
    const [homePage, setHomePage] = useState<Page>();

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get('pages/home');

                    setHomePage(data);
                } catch (error) {
                    console.log('');
                }
            }
        )();
    }, []);

    return (
        <Layout>
            <HomeSlider/>
            <PromotionSection/>
            <Advantages/>
            <PageDescription description={homePage? homePage.description : ''}/>
        </Layout>
    );
};

export default HomePage;
