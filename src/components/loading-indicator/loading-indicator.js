import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './loading-indicator.scss';

const LoadingIndicator = ({ isLoading }) => {
    const [showLoadingMessage, setShowLoadingMessage] = useState(false);

    useEffect(() => {
        let loadingMessageDelay, doneMessageDelay;

        if (isLoading) {
            loadingMessageDelay = setTimeout(() => {
                setShowLoadingMessage(true);
            }, 400);
        } else {
            doneMessageDelay = setTimeout(() => {
                setShowLoadingMessage(false);
            }, 300);
        }
        return () => {
            clearTimeout(loadingMessageDelay);
            clearTimeout(doneMessageDelay);
        };
    }, [isLoading]);

    return (
        showLoadingMessage && (
            <div
                className='loadingio-spinner-ripple-n24qf7xjqy'
                aria-live='assertive'
                aria-atomic='true'>
                <div className='ldio-zoew23s6me'>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    );
};

LoadingIndicator.propTypes = {
    isLoading: PropTypes.bool,
};

export default LoadingIndicator;
