import React from 'react';
import { NavLink } from 'react-router-dom';

import './header.scss';

import FocusLink from '../focus-link';

const Header = () => {
    return (
        <header className='header container'>
            <h1>
                <img
                    src={require('../../../images/ice-cream.svg')}
                    alt=''
                />
                valdo ice cream
            </h1>
            <nav>
                <FocusLink
                    to='/'
                    activeClassName='active'>
                    Menu
                </FocusLink>
            </nav>
        </header>
    );
};

export default Header;
