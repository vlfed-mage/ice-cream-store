import React from 'react';

import Header from '../structure/header';
import Footer from '../structure/footer';
import { Route, Routes } from 'react-router-dom';

import IceCreams from '../ice-cream/ice-creams';
import IceCreamList from '../ice-cream/ice-cream-list';
import IceCreamStock from '../ice-cream/ice-cream-stock';
import AddIceCream from '../ice-cream/add-ice-cream';

const App = () => {
    return (
        <>
            <a className='skip-link' href='#main'>
                Skip to content
            </a>
            <Header />
            <Routes>
                <Route path='/' element={<IceCreamList />} />
                <Route path='/ice-creams-stock' element={<IceCreamStock />} />
                <Route path='/ice-creams/add' element={<AddIceCream />} />
                <Route path='/ice-creams/*' element={<IceCreams />} />
                <Route path='*' element={<IceCreamList />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
