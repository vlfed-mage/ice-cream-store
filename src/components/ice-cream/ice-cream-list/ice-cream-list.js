import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import './ice-cream-list.scss';
import services from '../../../services';

import LoadingIndicator from '../../catchers/loading-indicator';
import Main from '../../structure/main';
import IceCreamCard from '../ice-cream-card';
import IceCreamCardContainer from '../ice-cream-card-container';

const IceCreamList = () => {
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(true);

    const { state, pathname } = useLocation();

    const { getData } = services();

    useEffect(() => {
        if (state?.id) {
            console.warn(`Nothing was found for ${pathname}${state.id}`);
        }

        getData('menu').then(data => {
            if (isMounted.current) {
                setMenu(data);
                setLoading(false);
            }
        });
        return () => {
            isMounted.current = false;
        };
    }, []);

    return (
        <Main headingText='Rock your taste buds with one of these!'>
            <LoadingIndicator isLoading={loading} />
            {menu && !loading ? (
                <IceCreamCardContainer>
                    {menu.map(({ id, iceCream, inStock, quantity, price, description }) => (
                        <IceCreamCard
                            key={id.toString()}
                            to={`/ice-creams/${id}`}
                            iceCreamId={iceCream.id}
                            headingName={iceCream.name}>
                            <div className='card-content'>
                                <p className='price'>{`$${price.toFixed(2)}`}</p>
                                <p className={`stock ${inStock ? '' : 'out'}`}>
                                    {inStock ? `${quantity} in stock` : 'Currently out of stock!'}
                                </p>
                                <p className='description'>{description}</p>
                            </div>
                        </IceCreamCard>
                    ))}
                </IceCreamCardContainer>
            ) : (
                !loading && <p>Your menu is empty! The sadness!</p>
            )}
        </Main>
    );
};

export default IceCreamList;
