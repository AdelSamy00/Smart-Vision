import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    employe: JSON.parse(window?.localStorage.getItem('employe')) ?? {},
};

const employeSlice = createSlice({
    name: 'employe',
    initialState,
    reducers: {
        setEmploye(state, action) {
            console.log(action.payload);
            state.employe = action.payload;
            localStorage.setItem('employe', JSON.stringify(action.payload));
        },
        logout(state) {
            state.employe = null;
            localStorage?.removeItem('token');
            localStorage?.removeItem('employe');
        },
    },
});
export default employeSlice.reducer;

export function SetEmploye(employe) {
    return (dispatch, getState) => {
        dispatch(employeSlice.actions.setEmploye(employe));
    };
}
export function Logout() {
    return (dispatch, getState) => {
        dispatch(employeSlice.actions.logout());
    };
}
