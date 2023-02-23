import React from 'react';

import { Helmet } from 'react-helmet';
import LoadingIndicator from '../loading-indicator';

const Main = () => {
    return (
        <main className='main container'>
            <Helmet>
                <title>Rock your taste buds with one of these! | Valdo Ice Cream</title>
            </Helmet>
            <h2 className='main-heading'>Rock your taste buds with one of these!</h2>
            <LoadingIndicator isLoading={true} />
        </main>
    );
};

export default Main;
