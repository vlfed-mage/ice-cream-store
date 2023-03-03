import React, { useEffect, useRef, useState } from 'react';

import './ice-cream.scss';

import IceCreamImage from './ice-cream-image';
import ErrorContainer from '../catchers/error-container';
import useUniqueIds from '../hooks/use-unique-ids';
import useValidation from '../hooks/use-validation';
import { validateDescription, validatePrice, validateQuantity } from '../../utils/validators';

const IceCream = ({
    onDelete,
    onSubmit,
    iceCream = {},
    inStock = true,
    quantity = 0,
    price = 0.0,
    description = '',
}) => {
    const formRef = useRef(true);
    const [submitted, setSubmitted] = useState(false);
    const [internalData, setInternalData] = useState({
        description: '',
        inStock: true,
        quantity: '0',
        price: '0.00',
    });

    const [stockId, quantityId, quantityErrorId, priceId, priceErrorId, descriptionId, descriptionErrorId] =
        useUniqueIds(7);

    const [descriptionError, descriptionErrorConfig] = useValidation(
        internalData?.description,
        descriptionErrorId,
        submitted,
        validateDescription
    );
    const [priceError, priceErrorConfig] = useValidation(internalData?.price, priceErrorId, submitted, validatePrice);
    const [quantityError, quantityErrorConfig] = useValidation(
        internalData?.quantity,
        quantityErrorId,
        submitted,
        validateQuantity,
        false,
        internalData?.inStock
    );

    useEffect(() => {
        setInternalData({
            price: price.toFixed(2),
            inStock,
            quantity: quantity.toString(),
            description,
        });
    }, [price, quantity, inStock, description]);

    const onChangeHandler = ({ target }) => {
        const newInternalData = {
            ...internalData,
            [target.name]: target.type === 'checkbox' ? target.checked : target.value,
        };

        if (target.name === 'quantity') {
            newInternalData.inStock = target.value !== '0';
        }

        if (target.name === 'inStock' && !target.checked) {
            newInternalData.quantity = '0';
        }

        setInternalData(newInternalData);
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        setSubmitted(true);

        const { inStock, quantity, price, description } = internalData;

        if (descriptionError || priceError || quantityError) {
            setTimeout(() => {
                // may not work in the next React versions
                const errorControl = formRef.current.querySelector('[aria-invalid="true"]');
                errorControl.focus();
            });
        } else {
            onSubmit({
                iceCream,
                inStock,
                quantity: parseInt(quantity),
                price: parseFloat(price),
                description,
            });
        }
    };

    return (
        <div className='form'>
            <div className='image-container'>
                <IceCreamImage iceCreamId={iceCream.id} />
            </div>
            <div>
                <div className='form-container'>
                    <dl>
                        <dt>Name:</dt>
                        <dd>{iceCream.name}</dd>
                    </dl>
                    <form onSubmit={onSubmitHandler} noValidate ref={formRef}>
                        {/* noValidate attribute needs if you're rolling your own validation, as we are */}
                        <label htmlFor={descriptionId}>
                            Description<span aria-hidden='true'>*</span>:{' '}
                        </label>
                        <ErrorContainer submitted={submitted} errorText={descriptionError} errorId={descriptionErrorId}>
                            <textarea
                                id={descriptionId}
                                name='description'
                                rows='3'
                                value={internalData.description}
                                onChange={onChangeHandler}
                                {...descriptionErrorConfig}
                            />
                        </ErrorContainer>
                        <label htmlFor={stockId}>In stock: </label>
                        <div className='checkbox-wrapper'>
                            <input
                                id={stockId}
                                name='inStock'
                                type='checkbox'
                                checked={internalData.inStock}
                                onChange={onChangeHandler}
                            />
                            <div className='checkbox-wrapper-checked' />
                        </div>
                        <label htmlFor={quantityId}>Quantity: </label>
                        <ErrorContainer submitted={submitted} errorText={quantityError} errorId={quantityErrorId}>
                            <select
                                id={quantityId}
                                name='quantity'
                                value={internalData.quantity}
                                {...quantityErrorConfig}
                                onChange={onChangeHandler}>
                                <option value='0'>0</option>
                                <option value='10'>10</option>
                                <option value='20'>20</option>
                                <option value='30'>30</option>
                                <option value='40'>40</option>
                                <option value='50'>50</option>
                            </select>
                        </ErrorContainer>
                        <label htmlFor={priceId}>
                            Price<span aria-hidden='true'>*</span>:{' '}
                        </label>
                        <ErrorContainer submitted={submitted} errorText={priceError} errorId={priceId}>
                            <input
                                id={priceId}
                                name='price'
                                type='number'
                                step='0.01'
                                value={internalData.price}
                                onChange={onChangeHandler}
                                {...priceErrorConfig}
                            />
                        </ErrorContainer>
                        <div className='button-container'>
                            <button className='ok' type='submit'>
                                Save
                            </button>
                            {onDelete && (
                                <button className='warning' type='button' onClick={onDelete}>
                                    Delete
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default IceCream;
