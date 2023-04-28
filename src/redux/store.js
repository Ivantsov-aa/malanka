import { configureStore } from '@reduxjs/toolkit';
import authAdminReducer from './slices/authSlice';
import localLanguageReducer from './slices/localSlice';

const store = configureStore({
    reducer: {
        authAdmin: authAdminReducer,
        localLanguage: localLanguageReducer
    }
});

export default store;