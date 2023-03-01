import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

import './main.scss';

const Main = ({ headingText, headingElement = 2, children }) => {
    const location = useLocation();
    const heading = useRef(null);
    const H = `h${headingElement}`;

    useEffect(() => {
        if (location.state?.focus) {
            heading.current.focus();
        }
        window.scrollTo(0, 0);
    }, [location.state]);

    return (
        <main className='main container' tabIndex='-1' id='main'>
            <Helmet>
                <title>{headingText} | Valdo ice cream</title>
            </Helmet>
            <H className='main-heading' tabIndex='-1' ref={heading}>
                {headingText}
            </H>
            {children}
        </main>
    );
};

export default Main;
