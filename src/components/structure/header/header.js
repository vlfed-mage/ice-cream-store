import React from 'react';

import './header.scss'
import {Link, NavLink} from 'react-router-dom';

const Header = () => {
    return (
        <header className='header container'>
            <h1>
                <Link to='/' >
                    <img src={ require('../../../images/ice-cream.svg') } alt=''/>
                    valdo ice cream
                </Link>
            </h1>
            <nav>
                <NavLink to='/'>Menu</NavLink>
            </nav>
        </header>
    );
}

export default Header;