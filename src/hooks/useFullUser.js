import React from 'react';
import { useSelector } from 'react-redux';

export default function useFullUser() {
	const user = useSelector((state) => state.auth.loggedUser);
	if (user == null) return null;

	return JSON.parse(user);
}
