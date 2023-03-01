import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './ice-cream-list.scss';
import services from '../../../services';

import IceCreamImage from '../ice-cream-image';
import LoadingIndicator from '../../catchers/loading-indicator';
import Main from '../../structure/main';
import FocusLink from '../../structure/focus-link';

const IceCreamList = () => {
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(true);

    const navigate = useNavigate();
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

    const onItemClickHandler = to => {
        navigate(to);
    };

    const onLinkClickHandler = e => {
        e.stopPropagation();
    };

    return (
        <Main headingText='Rock your taste buds with one of these!'>
            <LoadingIndicator isLoading={loading} />

            <ul className='ice-cream-list'>
                {menu && !loading
                    ? menu.map(({ id, iceCream, inStock, quantity, price, description }) => {
                          const { name, id: imageId } = iceCream;
                          return (
                              <li key={id.toString()}>
                                  <section className='card' onClick={() => onItemClickHandler(`/ice-creams/${id}`)}>
                                      <div className='card-image-container'>
                                          <IceCreamImage iceCreamId={imageId} />
                                      </div>
                                      <div className='card-info'>
                                          <h3>
                                              <FocusLink onClick={onLinkClickHandler} to={`/ice-creams/${id}`}>
                                                  {name}
                                              </FocusLink>
                                          </h3>
                                          <div className='card-content'>
                                              <p className='price'>{`$${price.toFixed(2)}`}</p>
                                              <p className={`stock ${inStock ? '' : 'out'}`}>
                                                  {inStock ? `${quantity} in stock` : 'Currently out of stock!'}
                                              </p>
                                              <p className='description'>{description}</p>
                                          </div>
                                      </div>
                                  </section>
                              </li>
                          );
                      })
                    : !loading && <p>Your menu is empty! The sadness!</p>}
            </ul>
        </Main>
    );
};

export default IceCreamList;
