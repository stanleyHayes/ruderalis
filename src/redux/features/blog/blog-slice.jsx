import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {BLOG_API} from "../../../api/blog";

const initialState = {
    blogs: [],
    blogDetail: null,
    blogLoading: false,
    blogError: null,
    blogMessage: null
};

export const getBlogs = createAsyncThunk('blog/getBlogs',
    async (_, {rejectWithValue}) => {
        try {
            const response = await BLOG_API.getBlogs();
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            return rejectWithValue(message);
        }
    });

export const getBlog = createAsyncThunk('blog/getBlog',
    async ({id}, {rejectWithValue}) => {
        try {
            const response = await BLOG_API.getBlog(id);
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            return rejectWithValue(message);
        }
    });

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getBlogs.pending, (state) => {
                state.blogLoading = true;
                state.blogError = null;
            }).addCase(getBlogs.fulfilled, (state, action) => {
                state.blogLoading = false;
                state.blogs = action.payload?.data || action.payload || [];
                state.blogMessage = action.payload.message;
            }).addCase(getBlogs.rejected, (state, action) => {
                state.blogLoading = false;
                state.blogError = action.payload;
            })
            .addCase(getBlog.pending, (state) => {
                state.blogLoading = true;
                state.blogError = null;
            }).addCase(getBlog.fulfilled, (state, action) => {
                state.blogLoading = false;
                state.blogDetail = action.payload?.data || action.payload || [];
            }).addCase(getBlog.rejected, (state, action) => {
                state.blogLoading = false;
                state.blogError = action.payload;
            })
    }
});

export const selectBlog = state => state.blog;
export default blogSlice.reducer;
