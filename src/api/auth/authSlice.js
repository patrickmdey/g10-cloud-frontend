import { createSlice } from '@reduxjs/toolkit';

const LOCAL_STORAGE_KEY = 'TOKEN';
const LOCAL_STORAGE_KEY_USER = 'EMAIL';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: window.localStorage.getItem(LOCAL_STORAGE_KEY),
		loggedUserEmail: window.localStorage.getItem(LOCAL_STORAGE_KEY_USER)
	},
	reducers: {
		setCredentials: (state, { payload: { token, loggedUserEmail, rememberMe } }) => {
			if (token == null) {
				window.localStorage.removeItem(LOCAL_STORAGE_KEY);
				window.localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
			} else if (rememberMe) {
				window.localStorage.setItem(LOCAL_STORAGE_KEY, token);
				window.localStorage.setItem(LOCAL_STORAGE_KEY_USER, loggedUserEmail);
			}

			state.loggedUserEmail = JSON.stringify(loggedUserEmail);
			state.token = token;
		}
	}
});

export const setCredentials = authSlice.actions.setCredentials;
export const selectCurrentUser = (state) => state.auth.token;

export default authSlice.reducer;
