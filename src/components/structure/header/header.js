import React from 'react';

import './header.scss'
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <header className='header container'>
            <h1>
                <Link to='/' >
                    <img src={ require('../../../images/ice-cream.svg') } alt=''/>
                    valdo ice cream
                </Link>
            </h1>
        </header>
    );
}

export default Header;