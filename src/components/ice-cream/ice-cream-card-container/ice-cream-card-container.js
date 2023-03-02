import React, { Children } from 'react';

const IceCreamCardContainer = ({ children }) => (
    <ul className='ice-cream-list'>
        {Children.map(children, card => (
            <li>{card}</li>
        ))}
    </ul>
);

export default IceCreamCardContainer;
