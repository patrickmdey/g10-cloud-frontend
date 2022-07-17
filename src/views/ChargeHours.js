import { Table, Button, Dropdown } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useCreateTimesheet, useDeleteTimesheet, useListTimesheets } from '../api/timesheets/timesheetsSlice.js';
import { useListCategories } from '../api/categories/categoriesSlice.js';
import { BsPencilFill, BsTrash } from 'react-icons/bs';
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
	let categories = [
		[1, 'RHHH'],
		[2, 'IT'],
		[3, 'Marketing']
	];

	const [newTimesheetIndex, setNewTimesheetIndex] = useState(0);

	const [createTimesheet] = useCreateTimesheet();

	const [deleteTimesheet] = useDeleteTimesheet();

	useEffect(() => {
		if (!timesheetsIsSuccess || !timesheets || timesheets.length === 0) {
			setNewTimesheetIndex(1);
			return;
		}

		setNewTimesheetIndex(timesheets.length);
	}, [timesheetsIsSuccess, timesheets]);

	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

	function onSubmit(data) {
		if (data == null) return;
		createTimesheet(data);
	}

	return (
		<div className='table-container'>
			<h1 className='h1 fw-bold'>Charge Hours</h1>
			<div className='d-flex justify-content-end align-center'>
				<p>Select</p>
				<Dropdown>
					<Dropdown.Toggle variant='success' id='dropdown-basic'>
						Month
					</Dropdown.Toggle>
					<Dropdown.Menu>
						{timesheetsIsSuccess && timesheets && timesheets.length > 0 && (
							<Dropdown.Item onClick={() => setCurrentMonth}>
								{timesheets[timesheets.length - 1].month}
							</Dropdown.Item>
						)}
					</Dropdown.Menu>
				</Dropdown>
			</div>

			<Form onSubmit={handleSubmit(onSubmit)}>
				<Table striped bordered>
					<thead className='bg-color-secondary'>
						<tr>
							<th>#</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Category</th>
							<th>Hours</th>
							<th>Date</th>
							<th>Options</th>
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
									<td className='d-flex justify-content-center'>
										<BsPencilFill className='fa-lg color-action' onClick={() => 1} />
										<BsTrash
											className='fa-lg color-danger'
											onClick={() => deleteTimesheet(timesheet.id)}
										/>
									</td>
								</tr>
							))}

						<tr className='bg-color-white'>
							<td>{newTimesheetIndex}</td>
							<td>Patrick</td>
							<td>Dey</td>
							<td>
								{categoriesIsSuccess && categories && (
									<FormSelect
										register={register}
										errors={errors}
										name='category'
										options={categories}
									/>
								)}
							</td>
							<td>{3}</td>
							<td>{new Date().toLocaleString()}</td>
							<td>
								<div className='d-flex justify-content-star'>
									<Button type='submit' className='me-3'>
										Aceptar
									</Button>
									<Button variant='outline-danger'>Cancelar</Button>
								</div>
							</td>
						</tr>
					</tbody>
				</Table>
			</Form>
		</div>
	);
}
