import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isNavigatedProgrammatically: false,
};

const navigationSlice = createSlice({
    name: "programmaticNavigation",
    initialState,
    reducers: {
        setNavigatedProgrammatically: (state, action) => {
            state.isNavigatedProgrammatically = action.payload;
        },
    },
});

export const { setNavigatedProgrammatically } = navigationSlice.actions;
export default navigationSlice.reducer;
