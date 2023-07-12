import { configureStore } from '@reduxjs/toolkit';
import activityReducer from './activitySlice';
import moodTypeReducer from './moodTypeSlice';
import moodReducer from './moodSlice';

export const store = configureStore({
    reducer: {
       activity : activityReducer,
       moodType : moodTypeReducer,
       mood : moodReducer
    },
});