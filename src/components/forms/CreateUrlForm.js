import { useEffect } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import FormInput from '../FormInputs/FormInput';
import { useNavigate } from 'react-router-dom';
import { useCreateUrl } from '../../api/urls/urlsSlice';

function CreateUrlForm() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			redirect_to: '',
			alias: '',
			name: ''
		}
	});

	const [createUrl, result] = useCreateUrl();
	const navigate = useNavigate();

	useEffect(() => {
		if (result.isSuccess) navigate(`/`);
	}, [result, navigate]);

	function onSubmit(data) {
		createUrl(data);
	}

	return (
		<Card className='card-style create-card'>
			<Card.Body className='form-container'>
				<Card.Title>
					<h3 className='fw-bold'>Create Alias</h3>
					<hr />
				</Card.Title>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<div className='my-2'>
						<FormInput
							register={register}
							label='Redirect to'
							name='redirect_to'
							type='text'
							error={errors.redirect_to}
							errorMessage='Url is required'
							placeholder='Redirect to'
							validation={{ required: true, maxLength: 50, minLength: 5 }} //TODO ver que sea un url
						/>
					</div>
					<div className='my-2'>
						<FormInput
							register={register}
							label='Alias'
							name='alias'
							prependIcon={`${process.env.REACT_APP_API_URL}/`}
							type='text'
							error={errors.alias}
							errorMessage='Alias is required'
							placeholder='Alias'
							validation={{ required: true, maxLength: 20, minLength: 4 }}
						/>
					</div>
					<div className='my-2'>
						<FormInput
							register={register}
							label='Title'
							name='name'
							placeholder='Title'
							error={errors.name}
							errorMessage='Erront'
							type='text'
							validation={{ required: false, maxLength: 20, minLength: 4 }}
						/>
					</div>
					<div className='d-grid gap-2'>
						<Button className='bg-color-action btn-dark mt-3 mb-2' type='submit'>
							Create
						</Button>
					</div>
				</Form>
			</Card.Body>
		</Card>
	);
}

export default CreateUrlForm;
