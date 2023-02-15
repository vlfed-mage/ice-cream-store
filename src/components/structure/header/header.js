import React from 'react';

import './header.scss'

const Header = () => {
    return (
        <header className='header container'>
            <h1>
                <img src={ require('../../../images/ice-cream.svg') } alt=""/>
                valdo ice cream
            </h1>
        </header>
    );
}

export default Header;