import { configureStore } from "@reduxjs/toolkit";

import ChessboardReducer from "./features/game/ChessboardSlice";

export default configureStore({
    reducer: {
        board: ChessboardReducer,
    },
});
