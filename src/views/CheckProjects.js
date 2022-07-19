import { Dropdown, Table, Form, Button, DropdownButton, Spinner } from 'react-bootstrap';
import { useCreateCategory, useListCategories } from '../api/categories/categoriesSlice';
import { useListTimesheets } from '../api/timesheets/timesheetsSlice';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '../components/FormInputs/FormInput';

export default function CheckProjects() {
	const [currentCategory, setCurrentCategory] = useState(null);
	const [totalHours, setTotalHours] = useState(0);

	const { data: categories, isSuccess: categoriesIsSuccess } = useListCategories({});
	const { data: timesheets, isSuccess: timesheetsIsSuccess } = useListTimesheets({ category: currentCategory });

	useEffect(() => {
		if (!categoriesIsSuccess || !categories || categories.length === 0) {
			setCurrentCategory(null);
			return;
		}
		setCurrentCategory(categories[0]);
	}, [categoriesIsSuccess, categories]);

	useEffect(() => {
		if (!timesheetsIsSuccess || !timesheets || timesheets.length === 0) {
			setTotalHours(0);
			return;
		}
		let total = 0;
		timesheets.forEach((timesheet) => {
			total += timesheet.hours;
		});
		setTotalHours(total);
	}, [timesheetsIsSuccess, timesheets, currentCategory]);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	const [createCategory] = useCreateCategory();

	function onSubmit(data) {
		createCategory(data);
	}

	return (
		<div className='table-container'>
			<div className='d-flex justify-content-between align-items-center mt-5'>
				<h1 className='h1 fw-light'>{currentCategory != null ? 'Project: ' + currentCategory.name : ''}</h1>
				<DropdownButton title='Select Project' align='end' variant='success' id='dropdown-basic'>
					{categoriesIsSuccess &&
						categories &&
						categories.length > 0 &&
						categories.map((category) => {
							return (
								<Dropdown.Item key={category.id} onClick={() => setCurrentCategory(category)}>
									{category.name}
								</Dropdown.Item>
							);
						})}
					<Dropdown.Divider />
					<Dropdown.ItemText className='d-flex align-text-center justify-center px-7 '>
						<Form onSubmit={handleSubmit(onSubmit)}>
							<div className='d-flex justify-center align-center'>
								<FormInput
									register={register}
									name='name'
									type='text'
									error={errors.name}
									errorMessage='Name is required'
									placeholder='New Project'
									validation={{ required: true, maxLength: 50, minLength: 3 }}
								/>
								<Button className='ms-2' color='success' type='submit'>
									+
								</Button>
							</div>
						</Form>
					</Dropdown.ItemText>
				</DropdownButton>
			</div>
			<div>
				{timesheetsIsSuccess && timesheets ? (
					<Table striped bordered>
						<thead className='bg-color-secondary'>
							<tr>
								<th>#</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Task</th>
								<th>Date</th>
								<th className='text-end'>Hours</th>
							</tr>
						</thead>
						<tbody>
							{timesheets.map((timesheet, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{timesheet.user_name}</td>
									<td>{timesheet.user_lastname}</td>
									<td>{timesheet.task}</td>
									<td>{new Date(timesheet._date).toLocaleDateString()}</td>
									<td className='text-end'>{timesheet.hours}</td>
								</tr>
							))}
							<tr className='bg-color-white'>
								<td colSpan={5}></td>
								<td className='text-end'>
									Total hours: <b className='fw-bold'>{totalHours}</b>
								</td>
							</tr>
						</tbody>
					</Table>
				) : (
					<div className='d-flex justify-content-center'>
						<Spinner animation='border' className='color-secondary' variant='primary' />
					</div>
				)}
			</div>
		</div>
	);
}
