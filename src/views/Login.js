import LogInComponent from '../components/forms/LoginForm.js';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

export default function Login() {
	return (
		<>
			<Helmet>
				<title>Login</title>
			</Helmet>
			<Container style={{ width: '50%' }} className=' min-height'>
				<LogInComponent />
			</Container>
		</>
	);
}
