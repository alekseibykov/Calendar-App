import { createSlice } from '@reduxjs/toolkit';

const getISODateString = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
};

const getFutureISODateString = (baseDate, daysToAdd) => {
  const newDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
  newDate.setDate(newDate.getDate() + daysToAdd);
  return newDate.toISOString();
};

const today = new Date();

const initialState = {
  today: getISODateString(today),
  tomorrow: getFutureISODateString(today, 1),
  upcoming: getFutureISODateString(today, 2),
};

const datesSlice = createSlice({
  name: 'dates',
  initialState,
  reducers: {
    // No specific actions defined for dates yet, but can be added here
    // e.g., setSpecificDate: (state, action) => { state.specificDate = action.payload; }
  },
});

// export const { setSpecificDate } = datesSlice.actions; // Example if actions were defined
export default datesSlice.reducer; 