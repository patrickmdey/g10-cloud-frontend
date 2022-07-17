import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

export default function Error() {
	let errorImage = require('../assets/img/error.png');
	const navigate = useNavigate();
	return (
		<div className='d-flex flex-column justify-content-center align-items-center'>
			<img src={errorImage} />
			<h3>Resource Not Found</h3>
			<Button className='mt-3' onClick={() => navigate('/')}>
				Go back
			</Button>
		</div>
	);
}
