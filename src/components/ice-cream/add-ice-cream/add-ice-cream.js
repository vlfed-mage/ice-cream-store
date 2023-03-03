import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import './add-ice-cream.scss';

import services from '../../../services';

import LoadingIndicator from '../../catchers/loading-indicator';
import Main from '../../structure/main';
import IceCream from '../ice-cream';

const AddIceCream = () => {
    const isMounted = useRef(true);
    const [iceCream, setIceCream] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const { itemId } = useParams();

    const { getData, postData } = services();

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        getData('ice-creams', location.search.split('=')[1])
            .then(item => {
                if (isMounted.current) {
                    setIceCream(item);
                    setLoading(false);
                }
            })
            .catch(err => {
                if (isMounted.current && err.response.status === 404) {
                    console.log(isMounted, err.response.status);
                    navigate('/', { replace: true, state: { id: itemId, focus: true } });
                }
            });
    }, [location.search]);

    const onSubmitHandler = menuItem => {
        postData('menu', menuItem).then(() => {
            navigate('/', { state: { focus: true } });
        });
    };

    return (
        <Main headingText='Add some goodness to the menu.'>
            <LoadingIndicator isLoading={loading} />
            {iceCream && !loading && <IceCream iceCream={iceCream} onSubmit={onSubmitHandler} />}
        </Main>
    );
};

export default AddIceCream;
