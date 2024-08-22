import { createSlice } from "@reduxjs/toolkit";

const matchSlice = createSlice({
    name: "match",
    initialState: {
        match: null,
        loading: false,
        error: null,
    },
    reducers: {
        createMatch: (state) => {
            state.loading = true;
            state.error = null;
        },
        createMatchSuccess: (state, action) => {
            state.match = action.payload;
            state.loading = false;
        },
        createMatchFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateMatch: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateMatchSuccess: (state, action) => {
            state.match = action.payload;
            state.loading = false;
        },
        updateMatchFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});
