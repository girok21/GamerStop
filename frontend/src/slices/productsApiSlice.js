import { PRODUCT_URL, UPLOAD_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ pageNumber, keyword, category }) => ({
                url: PRODUCT_URL,
                params: {
                    pageNumber,
                    keyword,
                    category,
                }
            }),
            providesTags: ['Products'],
            keepUnusedDataFor: 5
        }), 
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/byId/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        getNewArrivals: builder.query({
            query: ()=> ({
                url: `${PRODUCT_URL}/newArrivals`
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: ()=> ({
                url: PRODUCT_URL,
                method: 'POST',
            }),
            invalidatesTags: ['Prodcuts'],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/byId/${data.productId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Prodcut'],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: UPLOAD_URL,
                method: 'POST',
                body: data,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCT_URL}/byId/${productId}`,
                method: 'DELETE',
            }),
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/byId/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product'],
        })
    })
});

export const {  useGetProductsQuery, 
                useGetProductDetailsQuery,
                useCreateProductMutation, 
                useUpdateProductMutation,
                useUploadProductImageMutation,
                useDeleteProductMutation,
                useCreateReviewMutation,
                useGetNewArrivalsQuery
            } = productsApiSlice;
