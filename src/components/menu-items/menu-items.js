import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Menu from '../menu';
import EditIceCream from '../edit-ice-cream';

const MenuItems = () => {
    return (
        <Routes>
            <Route path='/' element={ <Menu /> } />
            <Route path=':itemId' element={ <EditIceCream /> } />
        </Routes>
    );
};

export default MenuItems;