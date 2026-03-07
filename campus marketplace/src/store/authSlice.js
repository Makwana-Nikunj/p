import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    profilePhoto: null,   // NEW
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
            state.profilePhoto = action.payload.profilePhoto || null; // NEW
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.profilePhoto = null;  // NEW
        },
        updateProfilePhoto: (state, action) => {   // NEW
            state.profilePhoto = action.payload;
        }
    }
});

export const { login, logout, updateProfilePhoto } = authSlice.actions;

export default authSlice.reducer;
