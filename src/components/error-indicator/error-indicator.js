import React from 'react';

import './error-indicator.scss';

const ErrorIndicator = () => {
    return (
        <div className='error-indicator'>
            <b>Something get terrible wrong</b>
            <span>Reload page or try it again later</span>
        </div>
    );
};

export default ErrorIndicator;
