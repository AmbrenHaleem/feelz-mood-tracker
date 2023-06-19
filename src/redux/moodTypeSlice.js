import { createSlice } from '@reduxjs/toolkit';

export const moodTypeSlice = createSlice({
    name: 'moodType',
    initialState: {
        moodTypes: [
            { id: '1', moodType: 'Sad' },
            { id: '2', moodType: 'Happy' },
            { id: '3', moodType: 'Angry' },
            { id: '4', moodType: 'Excited' },
            { id: '5', moodType: 'Tired' },
            { id: '6', moodType: 'Disturbed' },
            { id: '7', moodType: 'Annoyed' },
            { id: '8', moodType: 'Sleepy' },
            { id: '9', moodType: 'Stressed' },
            { id: '10', moodType: 'Calm' }
        ]
    }, 
    reducers: {
        addMoodType: (state, action) => {
           const newMoodType = {
            id: action.payload.id,
            moodType: action.payload.moodType
           };
           state.moodTypes.push(newMoodType);
        },
        clearMoodType: (state) => {
            state.moodTypes = [
                { id: '1', moodType: 'Sad' },
                { id: '2', moodType: 'Happy' },
                { id: '3', moodType: 'Angry' },
                { id: '4', moodType: 'Excited' },
                { id: '5', moodType: 'Tired' },
                { id: '6', moodType: 'Disturbed' },
                { id: '7', moodType: 'Annoyed' },
                { id: '8', moodType: 'Sleepy' },
                { id: '9', moodType: 'Stressed' },
                { id: '10', moodType: 'Calm' }
            ];
        },
    }
});

export const { addMoodType, clearMoodType } = moodTypeSlice.actions;
export default moodTypeSlice.reducer;