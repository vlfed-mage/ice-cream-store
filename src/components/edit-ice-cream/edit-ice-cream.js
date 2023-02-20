import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import './edit-ice-cream.scss'

import services from '../../services';

import LoadingIndicator from '../loading-indicator';
import IceCreamImage from '../ice-cream-image';

const EditIceCream = () => {
    const [ menuItem, setMenuItem ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const isMounted = useRef(true);
    const navigate = useNavigate();
    const { itemId } = useParams();

    const { getData } = services();

    useEffect(() => {
        getData('menu', itemId)
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
                    setLoading(false)
                }
            })
            .catch((err) => {
                if (isMounted.current && err.response.status === 404) {
                    navigate('/', { replace: true, state: { id } });
                }
            })
    }, [itemId]);

    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

    return (
        <main className='main container'>
            <Helmet>
                <title>Update this beauty | Valdo Ice Cream</title>
            </Helmet>
            <h2 className='main-heading' >Update this beauty</h2>
            <LoadingIndicator isLoading={ loading } />
            { menuItem && !loading &&
                <>
                    <div className='form'>
                        <div className="image-container">
                            <IceCreamImage iceCreamId={ menuItem.iceCream.id } />
                        </div>
                        <div>
                            <div className="form-container">
                                <dl>
                                    <dt>Name: </dt>
                                    <dd>{ menuItem.iceCream.name }</dd>
                                </dl>
                                <form>
                                    <label>Description: </label>
                                    <textarea
                                        name="description"
                                        rows="3"
                                        value={ menuItem.description }  />
                                    <label>In stock: </label>
                                    <div className="checkbox-wrapper">
                                        <input
                                            name="inStock"
                                            type='checkbox'
                                            checked={ menuItem.inStock } />
                                        <div className="checkbox-wrapper-checked" />
                                    </div>
                                    <label>Quantity: </label>
                                    <select
                                        name="quantity"
                                        value={ menuItem.quantity } >
                                        <option value="0">0</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                        <option value="40">40</option>
                                        <option value="50">50</option>
                                    </select>
                                    <label>Price: </label>
                                    <input
                                        name="price"
                                        type="number"
                                        step='0.01'
                                        value={ menuItem.price } />
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            }
        </main>
    );
};

export default EditIceCream;