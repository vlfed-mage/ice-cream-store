import React from 'react';

import './error-container.scss';

const ErrorContainer = ({ errorText, children, submitted, errorId }) => {
    return (
        <div className={errorText && submitted ? 'error' : null}>
            {children}
            <div className='error-wrapper'>{errorText && submitted && <span id={errorId}>{errorText}</span>}</div>
        </div>
    );
};

export default ErrorContainer;
