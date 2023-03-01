import './scss/main.scss';

import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ErrorBoundary from './components/catchers/error-boundary';
import App from './components/app';

ReactDOM.render(
    <StrictMode>
        <ErrorBoundary>
            <HelmetProvider>
                <Router>
                    <App />
                </Router>
            </HelmetProvider>
        </ErrorBoundary>
    </StrictMode>,
    document.getElementById('root')
);

module?.hot.accept();
