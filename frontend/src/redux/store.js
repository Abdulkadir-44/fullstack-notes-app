import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import searchSlice from "./searchSlice"

export default configureStore({
    reducer: {
        user: userSlice,
        search : searchSlice
    }
})