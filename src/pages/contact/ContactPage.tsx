import React from 'react';
import Layout from "../../components/Layout";
import Breadcrumb from "../../components/page-containers/Breadcrumb";

const ContactPage = () => {
    const breadcrumb = [
        {label: 'Home', link: '/'},
        {label: 'Contact', link: ''},
    ];

    return (
        <Layout>
            <Breadcrumb breadcrumb={breadcrumb}/>

            <div className={'container my-5'}>
                <h1 className={'global-title-1'}>Contact</h1>

                <div className={'row'}>
                    <div className={'col-6'}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1864.484195546328!2d19.932929598832075!3d50.05417422462551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165bcb0775d95b%3A0x6c2b2c699b0abb2b!2sWawel%20castle!5e0!3m2!1sru!2spl!4v1701375657696!5m2!1sru!2spl"
                            width="100%" height="636" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className={'col-6'}>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ContactPage;
