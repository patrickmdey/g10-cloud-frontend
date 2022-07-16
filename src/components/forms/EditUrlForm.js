import { useFindUrl, useUpdateUrl } from '../../api/urls/urlsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Card, Button } from 'react-bootstrap';
import FormInput from '../FormInputs/FormInput';

export function EditUrlForm() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	const { id } = useParams();
	const { data: url } = useFindUrl(`urls/${id}`);
	const [updateUrl, result] = useUpdateUrl();
	const navigate = useNavigate();

	useEffect(() => {
		if (result.isSuccess) navigate(`/`);
	}, [result, navigate]);

	function onSubmit(data) {
		console.log('NEW DATA', id);
		console.log({ id: id, ...data });
		updateUrl({ id: id, ...data });
	}

	return (
		<Card className='card-style create-card'>
			{url == null ? (
				<p>Error</p>
			) : (
				<Card.Body className='form-container'>
					<Card.Title>
						<h3 className='fw-bold'>Edit Alias</h3>
						<hr />
					</Card.Title>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<div className='my-2'>
							<FormInput
								register={register}
								label='Redirect to'
								name='redirect_to'
								type='text'
								value={url.redirect_to}
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
								value={url.alias}
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
								value={url.title}
								placeholder='Title'
								error={errors.name}
								errorMessage='Erront'
								type='text'
								validation={{ required: false, maxLength: 20, minLength: 4 }}
							/>
						</div>
						<div className='d-grid gap-2'>
							<Button className='bg-color-action btn-dark mt-3 mb-2' type='submit'>
								Confirm
							</Button>
						</div>
					</Form>
				</Card.Body>
			)}
		</Card>
	);
}
