import { Button, Card, Form, Row, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useLogin } from '../../api/authentication/authenticationSlice';
import FormInput from '../FormInputs/FormInput';
import { setCredentials } from '../../api/auth/authSlice';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

function ToggleShowIcon(props) {
	return props.show ? <BsEyeSlash /> : <BsEye />;
}

export default function LogInComponent() {
	const [isLoginError, setIsLoginError] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const { state } = useLocation();

	const [login, token, loggedUser, error] = useLogin();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: { email: '', password: '' }
	});

	useEffect(() => {
		if (token == null || loggedUser == null) return;

		setIsLoginError(false);
		dispatch(setCredentials({ token, loggedUser, rememberMe }));
		state?.path ? navigate(state?.path) : navigate(-1);
	}, [token, loggedUser]);

	useEffect(() => {
		if (error != null) setIsLoginError(true);
	}, [error]);

	function useOnSubmit(data) {
		setRememberMe(true);
		login(data);
	}

	return (
		<Card className='shadow card-style create-card mx-3'>
			<Card.Body className='form-container'>
				<Form onSubmit={handleSubmit(useOnSubmit)}>
					<h3 className='fw-bold my-1'>Login</h3>
					<hr />
					<Row xs={1} className='g-2'>
						<FormInput
							register={register}
							type='email'
							name='email'
							label='Email'
							placeholder='Email'
							error={errors.email}
							errorMessage='email Error'
							validation={{ required: true, minLength: 3, maxLength: 320 }}
						/>
						<FormInput
							register={register}
							label='Password'
							name='password'
							type='password'
							placeholder='Password'
							appendIcon={<ToggleShowIcon show={showPassword} />}
							show={showPassword}
							appendIconOnClick={() => setShowPassword((prev) => !prev)}
							error={errors.password}
							errorMessage='Password is required'
							validation={{ required: true, minLength: 8, maxLength: 20 }}
						/>
						{isLoginError && <p className='text-danger'>Wrong email or password</p>}
						<Stack direction='vertical'>
							<Button type='submit' className='btn-block bg-color-action btn-dark mt-3 mb-2'>
								Login
							</Button>
						</Stack>
					</Row>
				</Form>
			</Card.Body>
		</Card>
	);
}
