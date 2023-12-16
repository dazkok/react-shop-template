import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../css/swiper-navigation.css';
import '../../css/swiper-pagination.css';

import {Pagination, Navigation} from 'swiper/modules';
import ProductSquare from "../../components/products/ProductSquare";
import {Product} from "../../models/product";
import axios from "axios";

const PromotionSection = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get(`products/random`);

                    setProducts(data);
                    setLoading(false);
                } catch (error) {
                    console.log('');
                    setLoading(false);
                }
            }
        )();
    }, []);

    return (
        <div className={'container py-5'}>
            <div className={'global-title-1 mb-4'}>
                Exceptional offers for you
            </div>
            {loading ? (
                <div style={{height: '453px'}}
                     className={'d-flex align-items-center justify-content-center'}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <Swiper
                    style={{paddingBottom: '48px'}}
                    slidesPerView={'auto'}
                    slidesPerGroup={2}
                    slidesPerGroupSkip={1}
                    spaceBetween={30}
                    lazy={'true'}
                    breakpoints={{
                        1400: {
                            slidesPerGroup: 4,
                        },
                    }}
                    pagination={{
                        type: 'progressbar'
                    }}
                    navigation={true}
                    modules={[Navigation, Pagination]}
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id} style={{width: 'fit-content'}}>
                            <ProductSquare product={product} maxWidth={true}/>
                            <div className="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default PromotionSection;
