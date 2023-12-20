import React, {useEffect, useState} from 'react';
import AdvantageBox from "./AdvantageBox";
import {PageElement} from "../../models/element";
import axios from "axios";

const Advantages = () => {
    const [advantages, setAdvantages] = useState<PageElement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get('elements/home-advantages');

                    setAdvantages(data);
                    setLoading(false);
                } catch (error) {
                    console.log('');
                    setLoading(false);
                }
            }
        )();
    }, []);

    return (
        <div className={'container my-5'}>
            {loading ? (
                <div style={{height: '95px'}}
                     className={'d-flex align-items-center justify-content-center'}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className={'row'}>
                    {advantages.map((advantage) => (
                        <div className={'col-12 col-md-6 col-xl-3'} key={advantage.id}>
                            <AdvantageBox image={advantage.image} title={advantage.title}
                                          text={advantage.text}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Advantages;
