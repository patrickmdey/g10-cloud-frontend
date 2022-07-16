import { BaseApiSlice } from '../baseApiSlice';

const AuthApiSlice = BaseApiSlice.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation({
			query: ({ email, password }) => {
				return {
					url: 'auth/login',
					method: 'POST',
					body: {
						email: email,
						password: password
					}
				};
			},
			transformResponse: (response, meta, { callback }) => {
				const token = response.token;
				if (token == null) return callback(null);

				return callback(token);
			},
			invalidatesTags: () => [
				{
					type: 'Url',
					id: 'PARTIAL-LIST'
				}
			]
		})
	})
});

export const { useLoginMutation: useLogin } = AuthApiSlice;
