import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';

import './menu.scss';
import services from '../../services';

import IceCreamImage from '../ice-cream-image';
import LoadingIndicator from '../loading-indicator';

const Menu = () => {
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(true);

    const navigate = useNavigate();
    const { state, pathname } = useLocation();

    const { getData } = services();

    useEffect(() => {
        if (state) console.warn(`Nothing was found for ${pathname}${state.id}`);
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
        <main className='main container'>
            <Helmet>
                <title>Rock your taste buds with one of these! | Valdo Ice Cream</title>
            </Helmet>
            <h2 className='main-heading'>Rock your taste buds with one of these!</h2>
            <LoadingIndicator isLoading={loading} />
            <ul className='menu'>
                {menu && !loading
                    ? menu.map(({ id, iceCream, inStock, quantity, price, description }) => {
                          const { name, id: imageId } = iceCream;
                          return (
                              <li key={id.toString()}>
                                  <section
                                      onClick={() => navigate(`/menu-items/${id}`)}
                                      className='card'>
                                      <div className='card-image-container'>
                                          <IceCreamImage iceCreamId={imageId} />
                                      </div>
                                      <div className='card-info'>
                                          <h3>
                                              <Link to={`/menu-items/${id}`}>{name}</Link>
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
        </main>
    );
};

export default Menu;
