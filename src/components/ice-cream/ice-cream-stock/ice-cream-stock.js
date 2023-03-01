import React, { useEffect, useState } from 'react';

import services from '../../../services';

import Main from '../../structure/main';
import LoadingIndicator from '../../catchers/loading-indicator';

const IceCreamStock = () => {
    const [iceCreamStock, setIceCreamStock] = useState(null);
    const [loading, setLoading] = useState(true);

    const { getData } = services();

    useEffect(() => {
        let isMounted = true;

        getData('ice-creams').then(data => {
            if (isMounted) {
                setIceCreamStock(data);
                setLoading(false);
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    if (iceCreamStock) {
        console.log(iceCreamStock.map(el => console.log(el.name)));
    }

    return (
        <Main headingText='Choose your poison and enjoy!'>
            <LoadingIndicator isLoading={loading} />
        </Main>
    );
};

export default IceCreamStock;
