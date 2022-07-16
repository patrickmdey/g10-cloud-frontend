import { Button, Card, Form, Row, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogin } from '../../api/authentication/authenticationSlice';
import FormInput from '../FormInputs/FormInput';
import FormCheckbox from '../FormInputs/FormCheckbox';
import { setCredentials } from '../../api/auth/authSlice';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

export default function LogInComponent() {
	const [isLoginError, setIsLoginError] = useState(false);
	const { state } = useLocation();

	const [login] = useLogin();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: { email: '', password: '' }
	});

	function useOnSubmit(data) {
		const rememberMe = data.rememberMe;
		login({
			...data,
			callback: (token) => {
				if (token == null) {
					setIsLoginError(true);
					return;
				}

				setIsLoginError(false);
				dispatch(setCredentials({ token, rememberMe }));
				state?.path ? navigate(state?.path) : navigate(-1);
			}
		});
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
							type='password'
							name='password'
							label='Password'
							placeholder='Password'
							error={errors.password}
							errorMessage='Password error'
							validation={{ required: true, minLength: 8, maxLength: 20 }}
						/>
						<FormCheckbox register={register} label='Remember me' name='rememberMe' />
						{isLoginError && <p className='text-danger'>Error logging in</p>}
						<Stack direction='vertical'>
							<Button type='submit' className='btn-block bg-color-action btn-dark mt-3 mb-2'>
								Login
							</Button>
							<LinkContainer to='/register'>
								<button type='button' className='color-action btn'>
									Register
								</button>
							</LinkContainer>
						</Stack>
					</Row>
				</Form>
			</Card.Body>
		</Card>
	);
}
