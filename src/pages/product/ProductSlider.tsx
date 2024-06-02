import React, {useState} from 'react';

import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import '../../css/swiper-pagination.css';

import {FreeMode, Navigation, Pagination, Thumbs} from 'swiper/modules';

import {Swiper as SwiperType} from 'swiper';
import {ProductImage} from "../../models/product-image";

const ProductSlider = (props: { images: ProductImage[] | null }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={10}
                lazy={'true'}
                navigation={true}
                thumbs={{swiper: thumbsSwiper?.destroyed ? null : thumbsSwiper}}
                modules={[FreeMode, Navigation, Thumbs]}
                className="product-images-slider"
            >
                {props.images ? props.images.map((image) => (
                    <SwiperSlide key={image.id}>
                        <img src={`http://localhost:8010/images/${image.image}`}
                             alt={''}
                             width={'100%'}
                             height={'auto'}
                             className={'object-fit-contain product-page-image'}
                             loading={'lazy'}/>
                    </SwiperSlide>
                )) : ''}
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={5}
                slidesPerView={"auto"}
                freeMode={true}
                watchSlidesProgress={true}
                pagination={{
                    type: 'progressbar'
                }}
                modules={[FreeMode, Navigation, Thumbs, Pagination]}
                className="product-images-slider-thumbs mt-3"
            >
                {props.images && props.images.length > 1 ? props.images.map((image) => (
                    <SwiperSlide key={image.id} className={'product-images-thumb-item'}>
                        <img src={`http://localhost:8010/images/${image.image}`}
                             alt={''}
                             width={'auto'}
                             height={'100px'}
                             className={'object-fit-contain'}
                             loading={'lazy'}/>
                    </SwiperSlide>
                )) : ''}
            </Swiper>
        </>
    );
};

export default ProductSlider;
