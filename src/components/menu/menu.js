import React, { useState, useEffect } from 'react';
import services from '../../services';

import './menu.scss';

const Menu = () => {
    const [ menu, setMenu ] = useState([]);
    const { getData } = services();

    useEffect(() => {
        let isMounted = true
        getData('menu')
            .then((data) => {
                if (isMounted) {
                    setMenu(data)
                }
            })
        return () => {
            isMounted = false
        }
    }, []);

    return (
        <ul className='menu' >
            { menu && menu.map(({ id, iceCream, inStock, quantity, price, description }) => {
                const { name } = iceCream;
                return (
                    <li key={ id }>
                        <section
                            className='card' >
                            <div className="card-image-container">

                            </div>
                            <div className="card-info">
                                <h3>
                                    { name }
                                </h3>
                                <div className='card-content' >
                                    <p className="price">{`$${ price.toFixed(2) }`}</p>
                                    <p className={`stock ${ inStock ? '' : 'out' }`}>
                                        { inStock
                                            ? `${ quantity } in stock`
                                            : 'Currently out of stock!'}
                                    </p>
                                    <p className="description">{ description }</p>
                                </div>
                            </div>
                        </section>
                    </li>
                )
            }) }
        </ul>
    );
};

export default Menu;