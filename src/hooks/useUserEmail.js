import React from 'react';
import { useSelector } from 'react-redux';

export default function useUserEmail() {
	const user = useSelector((state) => state.auth.loggedUser);
	if (user == null) return null;

	const json = JSON.parse(user)
	if (json == null) return null;
	return json.email;
}
