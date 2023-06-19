import { configureStore } from '@reduxjs/toolkit';
import activityReducer from './activitySlice';
import moodTypeReducer from './moodTypeSlice';

export const store = configureStore({
    reducer: {
       activity : activityReducer,
       moodType : moodTypeReducer
    },
});