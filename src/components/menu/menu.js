import React, {
    useState,
    useEffect
} from 'react';

import './menu.scss';
import services from '../../services';

import IceCreamImage from '../ice-cream-image'
import LoadingIndicator from '../loading-indicator';

const Menu = () => {
    const [ menu, setMenu ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const { getData } = services();

    useEffect(() => {
        let isMounted = true;
        getData('menu').then((data) => {
            if (isMounted) {
                setMenu(data)
                setLoading(false)
            }
        });
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <ul className='menu' >
            <LoadingIndicator isLoading={ loading } />
            { menu.length > 0 && !loading ? (
                menu.map(({ id, iceCream, inStock, quantity, price, description }) => {
                    const { name, id: imageId } = iceCream;
                    return (
                        <li key={ id.toString() }>
                            <section
                                className='card' >
                                <div className='card-image-container'>
                                    <IceCreamImage iceCreamId={ imageId } />
                                </div>
                                <div className='card-info'>
                                    <h3>
                                        { name }
                                    </h3>
                                    <div className='card-content' >
                                        <p className='price'>{`$${ price.toFixed(2) }`}</p>
                                        <p className={`stock ${ inStock ? '' : 'out' }`}>
                                            { inStock
                                                ? `${ quantity } in stock`
                                                : 'Currently out of stock!'}
                                        </p>
                                        <p className='description'>{ description }</p>
                                    </div>
                                </div>
                            </section>
                        </li>
                    )
                }
            )) : (
                !loading && <p>Your menu is empty! The sadness!</p>
            ) }
        </ul>
    );
};

export default Menu;