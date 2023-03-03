import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './edit-ice-cream.scss';

import services from '../../../services';

import LoadingIndicator from '../../catchers/loading-indicator';
import Main from '../../structure/main';
import IceCream from '../ice-cream';

const EditIceCream = () => {
    const isMounted = useRef(true);
    const [menuItem, setMenuItem] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { itemId } = useParams();

    const { getData, putData, deleteData } = services();

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        getData('menu', itemId)
            .then(item => {
                if (isMounted.current) {
                    setMenuItem(item);
                    setLoading(false);
                }
            })
            .catch(err => {
                if (isMounted.current && err.response.status === 404) {
                    console.log(isMounted, err.response.status);
                    navigate('/', { replace: true, state: { id: itemId, focus: true } });
                }
            });
    }, [itemId]);

    const onDeleteHandler = () => {
        deleteData('menu', itemId).then(() => {
            navigate('/', { replace: true, state: { focus: true } });
        });
    };

    const onSubmitHandler = updatedItem => {
        putData('menu', { id: menuItem.id, ...updatedItem }).then(() => {
            navigate('/', { state: { focus: true } });
        });
    };

    return (
        <Main headingText='Update this beauty'>
            <LoadingIndicator isLoading={loading} />
            {menuItem && !loading && <IceCream {...menuItem} onDelete={onDeleteHandler} onSubmit={onSubmitHandler} />}
        </Main>
    );
};

export default EditIceCream;
