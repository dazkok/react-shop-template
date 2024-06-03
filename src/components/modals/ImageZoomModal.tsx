import React from 'react';
import '../../css/zoom-image.css';

const ImageZoomModal = (props: {image: string | null}) => {
    return (
        <div className="modal fade" id="imageZoomModal" aria-labelledby="imageZoomModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered zoom-image-dialog">
                <div className="modal-content border-0 bg-transparent">
                    <div className="modal-body p-0">
                        <button type="button" className="btn-close zoom-close-button" data-bs-dismiss="modal" aria-label="Close"></button>

                        <img className={'zoom-image'}
                             src={`http://localhost:8010/images/${props.image}`}
                             alt={''}
                             loading={'lazy'}
                             height={'100%'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageZoomModal;
