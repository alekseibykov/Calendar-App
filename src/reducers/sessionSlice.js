import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    authUser: null,
};
const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        },
        clearAuthUser: (state) => {
            state.authUser = null;
        },
    },
});
export const { setAuthUser, clearAuthUser } = sessionSlice.actions;
export default sessionSlice.reducer;
