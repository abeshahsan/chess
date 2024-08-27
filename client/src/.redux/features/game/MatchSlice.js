import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const startMatch = createAsyncThunk("match/startMatch", async (match) => {
    const data = await fetch("/api/start-match", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(match),
    }).then((res) => res.json());

    if (data.status === 0) {
        throw new Error(data.error);
    }

    return data.match;
});

const matchSlice = createSlice({
    name: "match",
    initialState: {
        match: null,
        loading: false,
        error: null,
        matchStarting: false,
        matchStarted: false,
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
    extraReducers: (builder) => {
        builder
            .addCase(startMatch.pending, (state) => {
                state.matchStarting = true;
                state.error = null;
            })
            .addCase(startMatch.fulfilled, (state, action) => {
                state.match = action.payload;
                state.matchStarting = false;
                state.matchStarted = true;
            })
            .addCase(startMatch.rejected, (state, action) => {
                state.error = action.payload;
                state.matchStarting = false;
            });
    },
});
