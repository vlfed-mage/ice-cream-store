import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import services from '../../services';

const EditIceCream = () => {
    const [ menuItem, setMenuItem ] = useState();
    const isMounted = useRef(true);
    const navigate = useNavigate();
    const { getData } = services();
    const { id } = useParams();

    useEffect(() => {
        getData('menu', id)
            .then(({ id, iceCream, inStock, quantity, price, description }) => {
                if (isMounted.current) {
                    setMenuItem({
                        id,
                        iceCream,
                        inStock,
                        quantity: quantity.toString(),
                        price: price.toFixed(2),
                        description
                    })
                }
            })
            .catch((err) => {
                if (isMounted.current && err.response.status === 404) {
                    navigate('/', { replace: true, state: { id } });
                }
            })
        return () => isMounted.current = false
    }, [id]);

    return (
        <main className='main container'>
            <Helmet>
                <title>Update this beauty | Valdo Ice Cream</title>
            </Helmet>
            <h2 className='main-heading' >Update this beauty</h2>
        </main>
    );
};

export default EditIceCream;