import { Dropdown, Table } from 'react-bootstrap';
import { useListCategories } from '../api/categories/categoriesSlice';
import { useListTimesheets } from '../api/timesheets/timesheetsSlice';
import { useState } from 'react';
import { useEffect } from 'react';

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
			return;
		}
		let total = 0;
		timesheets.forEach((timesheet) => {
			total += timesheet.hours;
		});
		setTotalHours(total);
	}, [timesheetsIsSuccess, timesheets]);

	return (
		<div className='table-container'>
			<div className='d-flex justify-content-between align-items-center mt-5'>
				<h1 className='h1 fw-light'>Check Projects</h1>
				<Dropdown>
					<Dropdown.Toggle variant='success' id='dropdown-basic'>
						{currentCategory != null ? currentCategory.name : 'Select Project'}
					</Dropdown.Toggle>
					<Dropdown.Menu>
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
					</Dropdown.Menu>
				</Dropdown>
			</div>
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
					{timesheetsIsSuccess &&
						timesheets &&
						timesheets.map((timesheet, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{timesheet.firstName}</td>
								<td>{timesheet.lastName}</td>
								<td>{timesheet.task}</td>
								<td>{new Date(timesheet._date).toLocaleDateString()}</td>
								<td className='text-end'>{timesheet.hours}</td>
							</tr>
						))}
					<tr>
						<td colSpan={5}></td>
						<td className='text-end'>
							Total hours: <b className='fw-bold'>{totalHours}</b>
						</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
}
