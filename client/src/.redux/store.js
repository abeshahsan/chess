import { configureStore } from "@reduxjs/toolkit";

import ChessboardReducer from "./features/game/ChessboardSlice";
import NavigationReducer from "./features/navigation/NavigationSlice";

export default configureStore({
    reducer: {
        board: ChessboardReducer,
        navigation: NavigationReducer,
    },
});
