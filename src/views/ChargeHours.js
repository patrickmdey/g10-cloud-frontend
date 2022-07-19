import { Table, Button, Dropdown, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useCreateTimesheet, useDeleteTimesheet, useListTimesheets } from '../api/timesheets/timesheetsSlice.js';
import { useListCategories } from '../api/categories/categoriesSlice.js';
import { BsPencilFill, BsTrash } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import FormInput from '../components/FormInputs/FormInput.js';
import FormSelect from '../components/FormInputs/FormSelect.js';

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

function toMonth(idx) {
	if (idx < 0) return MONTHS[12 + idx];
	console.log(`${idx}-${MONTHS[idx]}`);
	return MONTHS[idx];
}

function usePrevMonths(currentMonth) {
	const [prevMonths, _] = useState(Array.from({length: currentMonth + 1}, (__, i) => currentMonth - i).map((n) => toMonth(n)));
	return prevMonths;
}

export default function ChargeHours() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm();

	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

	const { data: timesheets, isSuccess: timesheetsIsSuccess } = useListTimesheets({ user: 1, month: currentMonth + 1 });
	const { data: categories, isSuccess: categoriesIsSuccess } = useListCategories({});

	const [newTimesheetIndex, setNewTimesheetIndex] = useState(0);
	const prevMonths = usePrevMonths(new Date().getMonth());

	const [createTimesheet] = useCreateTimesheet();

	const [deleteTimesheet] = useDeleteTimesheet();

	useEffect(() => {
		if (!timesheetsIsSuccess || !timesheets || timesheets.length === 0) {
			setNewTimesheetIndex(1);
			return;
		}

		setNewTimesheetIndex(timesheets.length + 1);
	}, [timesheetsIsSuccess, timesheets]);


	async function onSubmit(data) {
		if (data == null) return;
		data.user_id = 1;
		await createTimesheet(data);
		cleanAll();
	}

	function cleanAll() {
		reset({
			hours: 0,
			task: '',
			date: null,
			category: null
		});
	}

	return (
		<div className='table-container mt-2'>
			<div className='d-flex justify-content-between align-items-center mt-5'>
				<h1 className='h1 fw-light'>My Hours</h1>
				<Dropdown>
					<Dropdown.Toggle variant='success' id='dropdown-basic'>
						Selected Month: <b>{MONTHS[currentMonth]}</b>
					</Dropdown.Toggle>
					<Dropdown.Menu>
						{
							prevMonths.map((month) => {
								return (
									<Dropdown.Item key={month} onClick={() => setCurrentMonth(MONTHS.indexOf(month))}>
										{/* {new Date(month).toLocaleDateString('en-US', { month: 'long' })} */ month}
									</Dropdown.Item>
								);
							})}
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
							<th>Task</th>
							<th>Category</th>
							<th>Date</th>
							<th>Hours</th>
							<th>Options</th>
						</tr>
					</thead>
					<tbody>
					{timesheetsIsSuccess && timesheets ? (
							timesheets.map((timesheet, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{timesheet.firstName}</td>
								<td>{timesheet.lastName}</td>
								<td>{timesheet.task}</td>
								<td>{timesheet.name}</td>
								<td>{new Date(timesheet._date).toLocaleDateString()}</td>
								<td>{timesheet.hours}</td>
								<td className="align-middle">
								<div className="d-flex justify-content-center align-items-center">
									<Button
									variant="btn-link"
									onClick={() => deleteTimesheet(timesheet.id)}
									>
									<BsTrash className="fa-lg color-danger" />
									</Button>
								</div>
								</td>
							</tr>
							))
							) : (
							<div className="d-flex justify-content-center">
								<Spinner
								animation="border"
								className="color-secondary"
								variant="primary"
								/>
							</div>
            			)}
						<tr className='bg-color-white'>
							<td>{newTimesheetIndex}</td>
							<td>Patrick</td>
							<td>Dey</td>
							<td>
								<FormInput
									name='task'
									as='textarea'
									placeholder='Task'
									register={register}
									errors={errors}
								/>
							</td>
							<td>
								{categoriesIsSuccess && categories && (
									<FormSelect
										register={register}
										errors={errors}
										name='category_id'
										options={categories.map((category) => [category.id, category.name])}
									/>
								)}
							</td>
							<td>
								<FormInput name='date' type='date' register={register} />
							</td>
							<td>
								<FormInput
									type='number'
									name='hours'
									placeholder='Amount'
									register={register}
									errors={errors}
								/>
							</td>
							<td>
								<div className='d-flex justify-content-star'>
									<Button type='submit' className='me-3'>
										Accept
									</Button>
									<Button variant='outline-danger' onClick={() => cleanAll()}>
										Clean
									</Button>
								</div>
							</td>
						</tr>
					</tbody>
				</Table>
			</Form>
		</div>
	);
}
