import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './ice-creams.scss';

import IceCreamList from '../ice-cream-list';
import EditIceCream from '../edit-ice-cream';

const MenuItems = () => {
    return (
        <Routes>
            <Route path='/' element={<IceCreamList />} />
            <Route path=':itemId' element={<EditIceCream />} />
        </Routes>
    );
};

export default MenuItems;
