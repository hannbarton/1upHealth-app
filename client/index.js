import React from 'react';
import ReactDOM from 'react-dom';
import store from "./store";
import { BrowserRouter } from 'react-router-dom';
import App from './app';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
  document.getElementById('app'),
);
