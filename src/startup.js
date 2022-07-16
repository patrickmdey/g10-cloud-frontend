import { useEffect, useReducer } from 'react';
import RouteMapper from './views/routeMapper';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

import { useSelector } from 'react-redux';

export default function Startup() {
	const token = useSelector((state) => state.auth.token);

	const [_, forceUpdate] = useReducer((x) => x + 1, 0);

	useEffect(() => {
		forceUpdate();
	}, [token]);

	return (
		<div>
			<Router basename={process.env.PUBLIC_URL}>
				<Header />
				<div className='min-height'>
					<RouteMapper />
				</div>
				<Footer />
			</Router>
		</div>
	);
}
