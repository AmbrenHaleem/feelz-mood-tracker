import { createSlice } from '@reduxjs/toolkit';

export const moodSlice = createSlice({
    name: 'mood',
    initialState: {
        moods: []
    }, 
    reducers: {
        addMood: (state, action) => {
           const newMood = {
            id: action.payload.id,
            mood: action.payload.mood,
            activity: action.payload.activity,
            contact: action.payload.contact,
            detail: action.payload.detail,
            moodDatetime: action.payload.moodDatetime
           };
           state.moods.push(newMood);
        },
        clearMoodType: (state) => {
            state.moodTypes = [];
        },
    }
});

export const { addMood, clearMood } = moodSlice.actions;
export default moodSlice.reducer;