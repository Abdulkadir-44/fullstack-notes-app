import { createSlice } from "@reduxjs/toolkit";

//eğer user varsa string şeklinde kaydedildiğinden localstroge'a bizim bunu js nesnesine dönüştürmemiz lazım 
const storedUser = localStorage.getItem("user");
const initialState = {
    user: storedUser ? JSON.parse(storedUser) : null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        userLogout: (state) => {
            localStorage.removeItem("user");
            state.user = null;
        }
    }
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
