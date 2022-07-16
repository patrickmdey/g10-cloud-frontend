import { BaseApiSlice } from '../baseApiSlice';

const TimesheetsApiSlice = BaseApiSlice.injectEndpoints({
	endpoints: (build) => ({
		findTimesheet: build.query({
			query: (url) => url.toString(),
			providesTags: (result) => (result ? [{ type: 'Timesheet', id: result.id }] : ['Timesheet'])
		}),

		listTimesheets: build.query({
			query: ({ category, user, orderBy }) =>
				`timesheets?${category ? `category_id=${category}&` : ''}${user ? `user_id=${user}&` : ''}${
					orderBy ? `order_by=${orderBy}&` : ''
				}`,
			providesTags: (result) =>
				result && result.data
					? [
							...result.data.map(({ id }) => ({ type: 'Timesheet', id: id })),
							{ type: 'Timesheet', id: 'PARTIAL-LIST' }
					  ]
					: [{ type: 'Timesheet', id: 'PARTIAL-LIST' }]
		}),

		createTimesheet: build.mutation({
			query: (args) => {
				return {
					url: 'timesheets',
					method: 'POST',
					body: args
				};
			},
			invalidatesTags: [{ type: 'Timesheet', id: 'PARTIAL-LIST' }]
		}),

		updateTimesheet: build.mutation({
			query: ({ id, ...args }) => ({
				url: `timesheets/${id}`,
				method: 'PUT',
				body: args
			}),
			invalidatesTags: ({ id }) => {
				return [
					{ type: 'Timesheet', id: id },
					{
						type: 'Timesheet',
						id: 'PARTIAL-LIST'
					}
				];
			}
		}),

		deleteTimesheet: build.mutation({
			query: (id) => ({
				url: `timesheets/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: (id) => {
				return [
					{ type: 'Timesheet', id: id },
					{ type: 'Timesheet', id: 'PARTIAL-LIST' }
				];
			}
		})
	})
});

export const {
	useListTimesheetsQuery: useListTimesheets,
	useFindTimesheetQuery: useFindTimesheet,
	useCreateTimesheetMutation: useCreateTimesheet,
	useUpdateTimesheetMutation: useUpdateTimesheet,
	useDeleteTimesheetMutation: useDeleteTimesheet
} = TimesheetsApiSlice;
