import { Card, Image, ListGroup, ListGroupItem } from 'react-bootstrap';

import logo from '../assets/img/logo.png';

export default function Footer() {
	return (
		<footer className=' footer-style bg-color-primary'>
			<Card.Body className='row my-n4'>
				<div className='col-4 footer-image-col'>
					<Image src={logo} className='mt-n3' height='180px' width='auto' alt='RentApp' />
				</div>
				<div className='col-4'>
					<ListGroup as='ul' className='col-6 list-unstyled'>
						<h3 className='h3 fw-bold color-grey'>Team</h3>
						<ListGroupItem bsPrefix='color-grey fw-bold mt-2'>Santos Rosati</ListGroupItem>
						<ListGroupItem bsPrefix='color-grey fw-bold mt-2'>Matias Lombardi</ListGroupItem>
						<ListGroupItem bsPrefix='color-grey fw-bold mt-2'>Patrick Dey</ListGroupItem>
					</ListGroup>
				</div>

				<div className='col-4'>
					<ListGroup className='list-unstyled' as='ul'>
						<ListGroupItem bsPrefix='h3 fw-bold color-grey'>Contact</ListGroupItem>
						<ListGroupItem bsPrefix='lead color-grey'>
							<a href='mailto:srosati@itba.edu.ar' className='color-secondary ms-1 pb-1'>
								srosati@itba.edu.ar
							</a>
						</ListGroupItem>
						<ListGroupItem bsPrefix='lead color-grey'>
							<a href='mlombardi@itba.edu.ar' className='color-secondary ms-1 pb-1'>
								mlombardi@itba.edu.ar
							</a>
						</ListGroupItem>
						<ListGroupItem bsPrefix='lead color-grey'>
							<a href='mailto:pdey@itba.edu.ar' className='color-secondary ms-1 pb-1'>
								pdey@itba.edu.ar
							</a>
						</ListGroupItem>
					</ListGroup>
				</div>
			</Card.Body>
			<Card.Footer
				className='bg-color-secondary d-flex justify-content-center align-content-center'
				style={{ height: '40px' }}
			>
				<p className='fw-light'>Bases de Datos 2 - Grupo PMS</p>
			</Card.Footer>
		</footer>
	);
}
