import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    board: {
        _id: "",
        state: "",
        turn: "",
        moveHistory: [],
    },
    loading: false,
    error: null,
};

export const createBoard = createAsyncThunk("chessboard/createBoard", async () => {
    const response = await fetch("/game", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            command: "create",
        }),
    });

    const data = await response.json();

    if (data.status === 0) {
        throw new Error(data.error);
    }

    return data.board;
});

export const updateBoard = createAsyncThunk("chessboard/updateBoard", async ({ boardId, from, to }) => {
    const response = await fetch("/game", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            command: "update",
            boardId,
            from,
            to,
        }),
    });

    const data = await response.json();

    if (data.status === 0) {
        throw new Error(data.error);
    }

    return data.board;
});

const boardSlice = createSlice({
    name: "board",
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createBoard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBoard.fulfilled, (state, action) => {
                state.board = action.payload;
                state.loading = false;
            })
            .addCase(createBoard.rejected, (state, action) => {
                state.error = action.error?.message;
                state.loading = false;
            })
            .addCase(updateBoard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBoard.fulfilled, (state, action) => {
                state.board = action.payload;
                state.loading = false;
            })
            .addCase(updateBoard.rejected, (state, action) => {
                state.error = action.error?.message;
                state.loading = false;
            });
    },
});

export default boardSlice.reducer;
