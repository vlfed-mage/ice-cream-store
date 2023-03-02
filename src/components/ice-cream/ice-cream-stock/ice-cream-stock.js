import React, { useEffect, useState } from 'react';

import services from '../../../services';

import Main from '../../structure/main';
import LoadingIndicator from '../../catchers/loading-indicator';
import IceCreamCard from '../ice-cream-card';
import IceCreamCardContainer from '../ice-cream-card-container';

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

    return (
        <Main headingText='Choose your poison and enjoy!'>
            <LoadingIndicator isLoading={loading} />
            {iceCreamStock && !loading ? (
                <IceCreamCardContainer>
                    {iceCreamStock.map(({ id, name }) => (
                        <IceCreamCard key={id.toString()} to={`/`} iceCreamId={id} headingName={name}></IceCreamCard>
                    ))}
                </IceCreamCardContainer>
            ) : (
                !loading && <p>Your menu is fully stocked!</p>
            )}
        </Main>
    );
};

export default IceCreamStock;
