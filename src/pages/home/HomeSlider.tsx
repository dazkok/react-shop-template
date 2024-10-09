import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import {Autoplay, EffectFade} from 'swiper/modules';
import {PageElement} from "../../models/element";
import axios from "axios";

const HomeSlider = () => {
    const [slides, setSlides] = useState<PageElement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get('elements/home-page-slider');

                    setSlides(data);
                    setLoading(false);
                } catch (error) {
                    console.log('');
                    setLoading(false);
                }
            }
        )();
    }, []);

    return (
        <div>
            {loading ? (
                <div style={{height: '620px'}}
                     className={'d-flex align-items-center justify-content-center'}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <Swiper
                    effect={'fade'}
                    lazy={'true'}
                    spaceBetween={50}
                    centeredSlides={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    slidesPerView={1}
                    modules={[Autoplay, EffectFade]}
                    className={'home-swiper w-100'}
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <img src={`http://localhost:8010/images/${slide.image}`}
                                 alt={''}
                                 className={'home-slider-image'}
                                 width={'100%'}
                                 height={'auto'}
                                 loading={'lazy'}/>
                            <div className={'home-slider-items'}>
                                <span className={'home-slider-title'}>{slide.title}</span>

                                <span className={'home-slider-subtitle mb-4'}
                                      dangerouslySetInnerHTML={{__html: slide.text}}/>

                                <a href={slide.link} className={'btn global-button home-slider-button'}>
                                    {slide.additional_field}
                                </a>
                            </div>
                            {/*<div className="swiper-lazy-preloader swiper-lazy-preloader-black"></div>*/}
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default HomeSlider;
