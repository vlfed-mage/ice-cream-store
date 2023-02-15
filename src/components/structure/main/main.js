import React from 'react';
import './main.scss';

import Menu from '../../menu';

const Main = () => {
    return (
        <main className='main container'>
            <h2 className='main-heading' >Rock your taste buds with one of these!</h2>
            <Menu />
        </main>
    );
};

export default Main;