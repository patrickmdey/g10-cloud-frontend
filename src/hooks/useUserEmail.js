import React from 'react';
import { useSelector } from 'react-redux';

export default function useUserEmail() {
	const email = useSelector((state) => state.auth.loggedUserEmail);
	if (email == null) return null;

	return email;
}
