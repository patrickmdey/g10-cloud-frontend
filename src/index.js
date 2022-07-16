import React from 'react';
import { createRoot } from 'react-dom/client';

import './assets/css/index.css';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import 'typeface-roboto';
import './assets/scss/app.scss';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Startup from './startup.js';
import { HelmetProvider } from 'react-helmet-async';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<div className='bg-color-grey min-height'>
		<React.StrictMode>
			<Provider store={store}>
				<HelmetProvider>
					<PersistGate loading={null} persistor={persistor}>
						<Startup />
					</PersistGate>
				</HelmetProvider>
			</Provider>
		</React.StrictMode>
	</div>
);
