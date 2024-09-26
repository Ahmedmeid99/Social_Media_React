import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './user/userSlice';

const store = configureStore({
    reducer: {
        User: UserSlice,
    }
});

export default store;
