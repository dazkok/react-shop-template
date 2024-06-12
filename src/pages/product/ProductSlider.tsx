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
import ImageZoomModal from "../../components/modals/ImageZoomModal";

const ProductSlider = (props: { images: ProductImage[] | null }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [zoomImageIndex, setZoomImageIndex] = useState<number | 0>(0);

    const handleZoomImage = (index: number) => {
        setZoomImageIndex(index);
    };

    return (
        props.images && props.images.length > 0 ?
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
                    {props.images ? props.images.map((image, index) => (
                        <SwiperSlide key={image.id}>
                            <img src={`http://localhost:8010/images/${image ? image.image : 'placeholder.svg'}`}
                                 alt={`${image.alt}`}
                                 data-bs-toggle="modal"
                                 data-bs-target="#imageZoomModal"
                                 width={'100%'}
                                 height={'auto'}
                                 className={'object-fit-contain product-page-image'}
                                 loading={'lazy'}
                                 onClick={() => handleZoomImage(index)}
                            />
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
                            <img src={`http://localhost:8010/images/${image.image ? image.image : 'placeholder.svg'}`}
                                 alt={`${image.alt}`}
                                 width={'auto'}
                                 height={'100px'}
                                 className={'object-fit-contain'}
                                 loading={'lazy'}/>
                        </SwiperSlide>
                    )) : ''}
                </Swiper>

                <ImageZoomModal
                    images={props.images}
                    currentIndex={zoomImageIndex}
                    setCurrentIndex={setZoomImageIndex}
                />
            </>
            :
            <>
                <img className={'product-square-image'}
                     src={`http://localhost:8010/images/placeholder.svg`}
                     alt={''}
                     loading={'lazy'}
                     width={'100%'}
                />
            </>
    );
};

export default ProductSlider;
