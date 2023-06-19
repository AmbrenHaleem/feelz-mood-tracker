import { createSlice } from '@reduxjs/toolkit';

export const activitySlice = createSlice({
    name: 'activity',
    initialState: {
        activities: []
    }, 
    reducers: {
        addActivity: (state, action) => {
           const newActivity = {
            id: action.payload.id,
            activity: action.payload.activity
           };
           state.activities.push(newActivity);
        },
        clearActivity: (state) => {
            state.activities = [];
        },
    }
});

export const { addActivity, clearActivity } = activitySlice.actions;
export default activitySlice.reducer;