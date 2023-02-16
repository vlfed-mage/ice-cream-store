import './scss/main.scss';

import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ErrorBoundary from './components/error-boundary';
import App from "./components/app";
import ScrollToTop from './components/scroll-to-top';

ReactDOM.render(
	<StrictMode>
		<ErrorBoundary>
			<HelmetProvider>
				<Router>
					<ScrollToTop />
					<App />
				</Router>
			</HelmetProvider>
		</ErrorBoundary>
	</StrictMode>,
	document.getElementById('root')
);

module?.hot.accept();