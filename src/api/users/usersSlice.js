import { BaseApiSlice } from '../baseApiSlice';

const UsersApiSlice = BaseApiSlice.injectEndpoints({
	endpoints: (build) => ({
		findUser: build.query({
			query: (id) => `users/${id}`
		}),

		createUser: build.mutation({
			query: (args) => {
				return {
					url: 'users',
					method: 'POST',
					body: args
				};
			},
			transformResponse: (_, meta) => {
				const auth = meta?.response?.headers.get('Authorization');
				if (auth == null) return null;

				const token = auth.split(' ')[1];

				return token;
			}
		}),

		updateUser: build.mutation({
			query: ({ id, ...args }) => {
				return {
					url: `users/${id}`,
					method: 'PUT',
					body: args
				};
			}
		}),

		deleteUser: build.mutation({
			query: (id) => {
				return {
					url: `users/${id}`,
					method: 'DELETE'
				};
			}
		})
	})
});

export const {
	useFindUserQuery: useFindUser,
	useCreateUserMutation: useCreateUser,
	useDeleteUserMutation: useDeleteUser,
	useUpdateUserMutation: useUpdateUser
} = UsersApiSlice;
