import React from 'react';

import './error-container.scss';

const ErrorContainer = ({ errorText, children, submited, errorId }) => {
    return (
        <div className={errorText && submited ? 'error' : null}>
            {children}
            <div className='error-wrapper'>{errorText && submited && <span id={errorId}>{errorText}</span>}</div>
        </div>
    );
};

export default ErrorContainer;
