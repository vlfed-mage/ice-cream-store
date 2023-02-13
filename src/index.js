import './scss/main.scss';

import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from "./components/app";

ReactDOM.render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById('root')
);

module?.hot.accept();