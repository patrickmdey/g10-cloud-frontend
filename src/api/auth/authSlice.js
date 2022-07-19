import { createSlice } from '@reduxjs/toolkit';

const LOCAL_STORAGE_KEY = 'TOKEN';
const LOCAL_STORAGE_KEY_USER = 'EMAIL';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: window.localStorage.getItem(LOCAL_STORAGE_KEY),
		loggedUser: localStorage.getItem(LOCAL_STORAGE_KEY_USER)
	},
	reducers: {
		setCredentials: (state, { payload: { token, loggedUser, rememberMe } }) => {
			if (token == null) {
				window.localStorage.removeItem(LOCAL_STORAGE_KEY);
				window.localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
			} else if (rememberMe) {
				window.localStorage.setItem(LOCAL_STORAGE_KEY, token);
				window.localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(loggedUser));
			}

			state.loggedUser = JSON.stringify(loggedUser);
			state.token = token;
		}
	}
});

export const setCredentials = authSlice.actions.setCredentials;
export const selectCurrentUser = (state) => state.auth.token;

export default authSlice.reducer;
