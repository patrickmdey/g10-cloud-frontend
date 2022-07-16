import { BaseApiSlice } from '../baseApiSlice';

const CategoriesApiSlice = BaseApiSlice.injectEndpoints({
	endpoints: (build) => ({
		findCategory: build.query({
			query: (url) => url.toString(),
			providesTags: (result) => (result ? [{ type: 'Category', id: result.id }] : ['Category'])
		}),

		listCategories: build.query({
			query: ({ category, orderBy }) =>
				`categories?${category ? `category_id=${category}&` : ''}${orderBy ? `order_by=${orderBy}&` : ''}`,
			providesTags: (result) =>
				result && result.data
					? [
							...result.data.map(({ id }) => ({ type: 'Category', id: id })),
							{ type: 'Category', id: 'PARTIAL-LIST' }
					  ]
					: [{ type: 'Category', id: 'PARTIAL-LIST' }]
		}),

		createCategory: build.mutation({
			query: (args) => {
				return {
					url: 'categories',
					method: 'POST',
					body: args
				};
			},
			invalidatesTags: [{ type: 'Category', id: 'PARTIAL-LIST' }]
		}),

		updateCategory: build.mutation({
			query: ({ id, ...args }) => ({
				url: `urls/${id}`,
				method: 'PUT',
				body: args
			}),
			invalidatesTags: ({ id }) => {
				return [
					{ type: 'Cateogory', id: id },
					{
						type: 'Category',
						id: 'PARTIAL-LIST'
					}
				];
			}
		}),

		deleteUrl: build.mutation({
			query: (id) => ({
				url: `categories/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: (id) => {
				return [
					{ type: 'Category', id: id },
					{ type: 'Category', id: 'PARTIAL-LIST' }
				];
			}
		})
	})
});

export const {
	useListCategoriesQuery: useListCategories,
	useFindCategoryQuery: useFindCategory,
	useCreateCategoryMutation: useCreateCategory,
	useUpdateCategoryMutation: useUpdateCategory,
	useDeleteCategoryMutation: useDeleteCategory
} = CategoriesApiSlice;
