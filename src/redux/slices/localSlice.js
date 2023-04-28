import { createSlice } from '@reduxjs/toolkit'
import { handlerLocalStorage } from '../../services/handlerLocalStorage';

const localSlice = createSlice({
    name: 'localLanguage',
    initialState: {
        language: handlerLocalStorage().get('language'),
    },
    reducers: {
        handleChange(state, action) {
            state.language = action.payload;
        }
    }
});

export const { handleChange } = localSlice.actions;
export default localSlice.reducer;

