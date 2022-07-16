import { Card, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useCreateTimesheet, useListTimesheets } from '../api/timesheets/timesheetsSlice.js';
import { useListCategories } from '../api/categories/categoriesSlice.js';
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import FormInput from '../components/FormInputs/FormInput.js';
import FormSelect from '../components/FormInputs/FormSelect.js';

export default function ChargeHours() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	const { data: timesheets, isSuccess: timesheetsIsSuccess } = useListTimesheets({ user: 1 });
	// const { data: categories, isSuccess: categoriesIsSuccess } = useListCategories();

	let categoriesIsSuccess = true;
	let categories = ['RHHH', 'IT', 'Marketing', 'Sales', 'Accounting'];

	const [newTimesheetIndex, setNewTimesheetIndex] = useState(0);

	const [createTimesheet, result] = useCreateTimesheet();

	useEffect(() => {
		if (!timesheetsIsSuccess || !timesheets || timesheets.length === 0) {
			setNewTimesheetIndex(-1);
			return;
		}

		setNewTimesheetIndex(timesheets.length);
	}, [timesheetsIsSuccess, timesheets]);

	function onSubmit(data) {
		if (data == null) return;
		createTimesheet(data);
	}

	return (
		<div>
			<h1>Charge Hours</h1>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Category</th>
							<th>Hours</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						{timesheetsIsSuccess &&
							timesheets &&
							timesheets.map((timesheet, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{timesheet.user.firstName}</td>
									<td>{timesheet.user.lastName}</td>
									<td>{timesheet.category.name}</td>
									<td>{timesheet.hours}</td>
									<td>{timesheet.date}</td>
								</tr>
							))}
						<tr>
							<td className='lead'>{newTimesheetIndex}</td>
							<td className='lead'>Patrick</td>
							<td className='lead'>Dey</td>
							<td className='lead'>
								{categoriesIsSuccess && categories && (
									<FormSelect
										register={register}
										errors={errors}
										name='category'
										options={categories}
									/>
								)}
							</td>
							<td className='lead'>{3}</td>
							<td className='lead'>{new Date().toLocaleString()}</td>
						</tr>
						{/* <tr>
						<td>1</td>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Jacob</td>
						<td>Thornton</td>
						<td>@fat</td>
					</tr>
					<tr>
						<td>3</td>
						<td colSpan={2}>Larry the Bird</td>
						<td>@twitter</td>
					</tr> */}
					</tbody>
				</Table>
			</Form>
		</div>
	);
}
