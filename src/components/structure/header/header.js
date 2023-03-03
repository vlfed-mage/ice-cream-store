import React from 'react';

import './header.scss';

import FocusLink from '../focus-link';

const Header = () => {
    return (
        <header className='header container'>
            <h1>
                <img src={require('../../../images/ice-cream.svg')} alt='' />
                valdo ice cream
            </h1>
            <nav>
                <FocusLink to='/' activeClassName='active'>
                    Ice-creams
                </FocusLink>
                <FocusLink to='/ice-creams-stock' activeClassName='active'>
                    Add ice cream
                </FocusLink>
            </nav>
        </header>
    );
};

export default Header;
