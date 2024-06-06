import React from 'react';
import '../../css/zoom-image.css';
import {ProductImage} from "../../models/product-image";

const ImageZoomModal = (props: {
    images: ProductImage[],
    currentIndex: number | 0,
    setCurrentIndex: (index: number) => void
}) => {
    const {images, currentIndex, setCurrentIndex} = props;

    const handlePrev = () => {
        setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
    };

    const handleNext = () => {
        setCurrentIndex(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
    };

    return (
        <div className="modal fade" id="imageZoomModal" aria-labelledby="imageZoomModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered zoom-image-dialog">
                <div className="modal-content border-0 bg-transparent">
                    <div className="modal-body p-0">
                        <button type="button" className="btn-close zoom-close-button" data-bs-dismiss="modal"
                                aria-label="Close"></button>

                        <img
                            className={'zoom-image'}
                            src={`http://localhost:8010/images/${images[currentIndex].image}`}
                            alt={''}
                            loading={'lazy'}
                            height={'100%'}
                        />

                        <button className="zoom-nav-button zoom-prev-button" onClick={handlePrev}>&#10094;</button>
                        <button className="zoom-nav-button zoom-next-button" onClick={handleNext}>&#10095;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageZoomModal;
