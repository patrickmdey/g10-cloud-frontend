import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import React, { useEffect, useState } from 'react';
import { BsBoxArrowInLeft, BsFillInboxFill } from 'react-icons/bs';
import { setCredentials } from '../api/auth/authSlice';

import { useFindUser } from '../api/users/usersSlice';
import useUserId from '../hooks/useUserId';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import logo from '../assets/img/logo.png';
import useUserEmail from '../hooks/useUserEmail';

function LoggedInNavBar(props) {
	const { dispatch } = props;
	const navigate = useNavigate();

	const name = useUserEmail();

	return (
		<>
			<LinkContainer to='/all'>
				<Nav.Link as='a' className='active fw-bold nav-bar-link'>
					All Projects
				</Nav.Link>
			</LinkContainer>

			<LinkContainer to='/charge'>
				<Nav.Link as='a' className='active fw-bold nav-bar-link'>
					Charge Hours
				</Nav.Link>
			</LinkContainer>

			<NavDropdown
				as='span'
				title={
					<div style={{ display: 'inline-block' }}>
						<div className='d-flex justify-content-center align-items-center'>
							<span className='color-grey fw-bold'>{name}</span>
						</div>
					</div>
				}
				className='active color-grey'
				id='collasible-nav-dropdown'
			>
				<NavDropdown.Item onClick={() => dispatch(setCredentials({ token: null, rememberMe: false }))}>
					<span>
						<BsBoxArrowInLeft className='me-1' />
					</span>
					<span>Logout</span>
				</NavDropdown.Item>
			</NavDropdown>
		</>
	);
}

function LoggedOutNavBar() {
	return (
		<React.Fragment>
			<LinkContainer to='/login'>
				<Nav.Link as='a' className='active fw-bold'>
					Login
				</Nav.Link>
			</LinkContainer>
		</React.Fragment>
	);
}

export default function Header() {
	const userId = useUserId();
	const dispatch = useDispatch();

	return (
		<Navbar collapseOnSelect expand='lg' bg='primary' className='mb-2' variant='dark'>
			<Container>
				<LinkContainer to='/'>
					<Navbar.Brand>
						<Image alt='rentapp' src={logo} height='60px' />
					</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse className='mt-2' id='responsive-nav-bar'>
					<Nav className='ms-auto d-flex align-items-center'>
						{userId != null ? <LoggedInNavBar dispatch={dispatch} userId={userId} /> : <LoggedOutNavBar />}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
