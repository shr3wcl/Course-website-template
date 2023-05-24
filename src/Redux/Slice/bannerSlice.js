import { createSlice } from "@reduxjs/toolkit";

const bannerSlice = createSlice({
    name: 'banner',
    initialState: {
        banner: {
            isFetching: null,
            error: null,
            success: null,
            data: null
        }
    },

    reducers: {
        bannerStart: (state) => {
            state.banner.isFetching = true;
            state.banner.error = false;
            state.banner.success = false;
            state.banner.data = false;
        },
        bannerSuccess: (state, action) => {
            state.banner.isFetching = false;
            state.banner.error = false;
            state.banner.success = true;
            state.banner.data = action.payload;
        },
        bannerFail: (state) => {
            state.banner.isFetching = false;
            state.banner.error = true;
            state.banner.success = false;
        }
    }
});

export const {
    bannerFail,bannerStart,bannerSuccess
} = bannerSlice.actions;

export default bannerSlice.reducer;
