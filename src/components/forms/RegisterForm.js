import { useEffect, useState } from 'react';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { Form, Card, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import FormInput from '../FormInputs/FormInput';
import { useNavigate } from 'react-router-dom';
import { useCreateUser } from '../../api/users/usersSlice';

function ToggleShowIcon(props) {
	return props.show ? <BsEyeSlash /> : <BsEye />;
}

export function RegisterForm() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const [showPassword, setShowPassword] = useState(false);

	const [createUser, result] = useCreateUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (result.isSuccess) navigate(`/`);
	}, [result, navigate]);

	function onSubmit(data) {
		createUser(data);
	}

	return (
		<Card className='card-style create-card'>
			<Card.Body className='form-container'>
				<Card.Title>
					<h3 className='fw-bold'>Register</h3>
					<hr />
				</Card.Title>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<div className='my-2'>
						<FormInput
							register={register}
							label='Email'
							name='email'
							type='text'
							error={errors.email}
							errorMessage='email is required'
							placeholder='Email'
							validation={{ required: true, maxLength: 50, minLength: 5 }} //TODO ver que sea un email
						/>
					</div>
					<div className='my-2'>
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
					</div>
					<div className='d-grid gap-2'>
						<Button className='bg-color-action btn-dark mt-3 mb-2' type='submit'>
							Register
						</Button>
					</div>
				</Form>
			</Card.Body>
		</Card>
	);
}

export default RegisterForm;
