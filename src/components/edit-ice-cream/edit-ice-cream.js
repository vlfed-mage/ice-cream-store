import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './edit-ice-cream.scss';

import services from '../../services';

import LoadingIndicator from '../loading-indicator';
import IceCreamImage from '../ice-cream-image';
import useUniqueIds from '../hooks/useUniqueIds';
import Main from '../structure/main';

const EditIceCream = () => {
    const [menuItem, setMenuItem] = useState(null);
    const [loading, setLoading] = useState(true);

    const isMounted = useRef(true);
    const navigate = useNavigate();
    const { itemId } = useParams();

    const { getData, putData } = services();

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        getData('menu', itemId)
            .then(data => {
                const { id, iceCream, inStock, quantity, price, description } = data;

                if (isMounted.current) {
                    setMenuItem({
                        id,
                        iceCream,
                        inStock,
                        quantity: quantity.toString(),
                        price: price.toFixed(2),
                        description,
                    });
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

    const onChangeHandler = ({ target }) => {
        const newMenuItemData = {
            ...menuItem,
            [target.name]: target.type === 'checkbox' ? target.checked : target.value,
        };

        if (target.name === 'quantity') {
            newMenuItemData.inStock = target.value != '0';
        }

        if (target.name === 'inStock' && !target.checked) {
            newMenuItemData.quantity = '0';
        }

        setMenuItem(newMenuItemData);
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        const { id, iceCream, inStock, quantity, price, description } = menuItem;

        const submitItem = {
            id,
            iceCream,
            inStock,
            quantity: parseInt(quantity),
            price: parseFloat(price),
            description,
        };

        putData('menu', submitItem).then(() => {
            navigate('/', { state: { focus: true } });
        });
    };

    const [stockId, quantityId, priceId, descriptionId] = useUniqueIds(4);

    return (
        <Main headingText='Update this beauty' headingElement='2'>
            <LoadingIndicator isLoading={loading} />

            {menuItem && !loading && (
                <div className='form'>
                    <div className='image-container'>
                        <IceCreamImage iceCreamId={menuItem.iceCream.id} />
                    </div>
                    <div>
                        <div className='form-container'>
                            <dl>
                                <dt>Name: </dt>
                                <dd>{menuItem.iceCream.name}</dd>
                            </dl>
                            <form onSubmit={onSubmitHandler}>
                                <label htmlFor={descriptionId}>Description: </label>
                                <textarea
                                    id={descriptionId}
                                    name='description'
                                    rows='3'
                                    value={menuItem.description}
                                    onChange={onChangeHandler}
                                />
                                <label htmlFor={stockId}>In stock: </label>
                                <div className='checkbox-wrapper'>
                                    <input
                                        id={stockId}
                                        name='inStock'
                                        type='checkbox'
                                        checked={menuItem.inStock}
                                        onChange={onChangeHandler}
                                    />
                                    <div className='checkbox-wrapper-checked' />
                                </div>
                                <label htmlFor={quantityId}>Quantity: </label>
                                <select
                                    id={quantityId}
                                    name='quantity'
                                    value={menuItem.quantity}
                                    onChange={onChangeHandler}>
                                    <option value='0'>0</option>
                                    <option value='10'>10</option>
                                    <option value='20'>20</option>
                                    <option value='30'>30</option>
                                    <option value='40'>40</option>
                                    <option value='50'>50</option>
                                </select>
                                <label htmlFor={priceId}>Price: </label>
                                <input
                                    id={priceId}
                                    name='price'
                                    type='number'
                                    step='0.01'
                                    value={menuItem.price}
                                    onChange={onChangeHandler}
                                />
                                <div className='button-container'>
                                    <button className='ok' type='submit'>
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </Main>
    );
};

export default EditIceCream;
