import { Route, Routes } from 'react-router-dom';

import Login from './Login';
import Home from './Home';
import Error from '../components/Error.js';
import useUserId from '../hooks/useUserId.js';
import { useLocation, Navigate } from 'react-router-dom';
import ChargeHours from './ChargeHours';
import CheckProjects from './CheckProjects';

function RequireAuth(props) {
	const id = useUserId();
	const location = useLocation();
	return id === null ? <Navigate to='/login' replace state={{ path: location.pathname }} /> : props.children;
}

export default function RouteMapper() {
	return (
		<div>
			<Routes>
				<Route path='*' element={<Error error={404} message='Not found' />} />
				<Route path='/login' element={<Login />} />

				<Route
					path='/'
					element={
						<RequireAuth>
							<Home />
						</RequireAuth>
					}
				/>
				<Route
					path='/charge'
					element={
						<RequireAuth>
							<ChargeHours />
						</RequireAuth>
					}
				/>
				<Route
					path='/all'
					element={
						<RequireAuth>
							<CheckProjects />
						</RequireAuth>
					}
				/>
			</Routes>
		</div>
	);
}
