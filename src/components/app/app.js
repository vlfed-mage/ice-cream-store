import React from 'react';

import Header from '../structure/header';
import Footer from '../structure/footer';
import { Route, Routes } from 'react-router-dom';

import MenuItems from '../menu-items';
import Menu from '../menu';

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route
                    path='/'
                    element={<Menu />}
                />
                <Route
                    path='/menu-items/*'
                    element={<MenuItems />}
                />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
