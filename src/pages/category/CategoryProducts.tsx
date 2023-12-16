import React from 'react';
import {Product} from "../../models/product";
import ProductSquare from "../../components/products/ProductSquare";

const CategoryProducts = (props: { products: Product[] | undefined, loading: boolean }) => {
    return (
        // <div className={'container my-5'}>
        //     {props.loading ? (
        //         <div style={{height: '1000px'}}
        //              className={'d-flex align-items-center justify-content-center'}>
        //             <div className="spinner-border" role="status">
        //                 <span className="visually-hidden">Loading...</span>
        //             </div>
        //         </div>
        //     ) : (
        //         <div className={'row'}>
        //             {props.products.length > 0 ? (
        //                 props.products.map((product) => (
        //                     <div key={product.id} className={'col-6 col-lg-4 col-xxl-3'}>
        //                         <ProductSquare key={product.id} product={product}/>
        //                     </div>
        //                 ))
        //             ) : (
        //                 <div className={'col-12'}>
        //                     <span className={'global-title-2'}>
        //                         There are no products in this category yet :( <br/>
        //                         Check back later
        //                     </span>
        //                 </div>
        //             )}
        //         </div>
        //     )}
        // </div>
        <div className={'container my-5'}>
            {props.loading ? (
                <div style={{height: '1000px'}} className={'d-flex align-items-center justify-content-center'}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className={'row'}>
                    {props.products && props.products.length > 0 ? (
                        props.products.map((product) => (
                            <div key={product.id} className={'col-6 col-lg-4 col-xxl-3'}>
                                <ProductSquare key={product.id} product={product} maxWidth={false}/>
                            </div>
                        ))
                    ) : props.products ? (
                        <div className={'col-12'}>
                            <span className={'global-title-2'}>
                                There are no products in this category yet :( <br/>
                                Check back later
                            </span>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </div>
    );
};

export default CategoryProducts;
