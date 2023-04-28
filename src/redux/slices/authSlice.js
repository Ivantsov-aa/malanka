import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'authAdmin',
    initialState: {
        userInfo: null,
        isLogged: false
    },
    reducers: {
        handleLogIn(state, action) {
            const { userInfo, isLogged } = action.payload;
            state.userInfo = userInfo;
            state.isLogged = isLogged;
            localStorage.setItem('logged', isLogged);
            localStorage.setItem('user', JSON.stringify(userInfo));
        },
        handleLogOut(state) {
            state.userInfo = null;
            state.isLogged = false;
            localStorage.removeItem('logged');
            localStorage.removeItem('user');
        }
    }
});

export const { handleLogIn, handleLogOut } = authSlice.actions;
export default authSlice.reducer;

