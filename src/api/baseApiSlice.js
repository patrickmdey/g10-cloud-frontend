import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BaseApiSlice = createApi({
	reducerPath: 'api',
	tagTypes: ['Url', 'Tag', 'UrlTag'],
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_URL,
		prepareHeaders(headers, { getState }) {
			const state = getState();
			if (state && state.auth.token) headers.set('Authorization', 'Bearer ' + state.auth.token);

			return headers;
		}
	}),
	endpoints: () => ({})
});
