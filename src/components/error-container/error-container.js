import React from 'react';

import './error-container.scss';

const ErrorContainer = ({ errorText, children, submited }) => {
    return (
        <div className={errorText && submited ? 'error' : null}>
            {children}
            <div className='error-wrapper'>{errorText && submited && <span>{errorText}</span>}</div>
        </div>
    );
};

export default ErrorContainer;
