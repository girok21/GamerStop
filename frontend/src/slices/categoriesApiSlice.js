import { apiSlice } from "./apiSlice";
import { PRODUCT_URL } from "../constants";

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=> ({
        getCategories: builder.query({
            query: ()=>({
                url: `${PRODUCT_URL}/category`
            }),
            keepUnusedDataFor: 5
        }),
        getCategory: builder.query({
            query: ({category})=>({
                url: `${PRODUCT_URL}/category/${category}`
            }),
            keepUnusedDataFor: 5
        })
    })
})

export const {
    useGetCategoriesQuery,
    useGetCategoryQuery
} = categoriesApiSlice