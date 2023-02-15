import React, {
    useState,
    useEffect
} from 'react';

import services from '../../services';

import IceCreamImage from '../ice-cream-image'

import './menu.scss';

const Menu = () => {
    const [ menu, setMenu ] = useState([]);
    const { getData } = services();

    useEffect(() => {
        let isMounted = true;
        getData('menu').then((data) => {
            if (isMounted) {
                setMenu(data)
            }
        });
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <ul className='menu' >
            { menu.length > 0 ? (
                menu.map(({ id, iceCream, inStock, quantity, price, description }) => {
                    const { name, id: imageId } = iceCream;
                    return (
                        <li key={ id.toString() }>
                            <section
                                className='card' >
                                <div className="card-image-container">
                                    <IceCreamImage iceCreamId={ imageId } />
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
                }
            )) : (
                <p>Your menu is empty! The sadness!</p>
            ) }
        </ul>
    );
};

export default Menu;