import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import RegisterForm from '../components/forms/RegisterForm';

export default function Register() {
	return (
		<>
			<Helmet>
				<title>Register</title>
			</Helmet>
			<Container style={{ width: '50%' }} className='min-height'>
				<RegisterForm></RegisterForm>
			</Container>
		</>
	);
}
