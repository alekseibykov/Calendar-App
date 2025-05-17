export const getISODateString = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
};

const getFutureISODateString = (baseDate, daysToAdd) => {
  const newDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
  newDate.setDate(newDate.getDate() + daysToAdd);
  return newDate.toISOString();
};

const today = new Date();

const INITIAL_STATE = {
  today: getISODateString(today),
  tomorrow: getFutureISODateString(today, 1),
  upcoming: getFutureISODateString(today, 2),
};

export const datesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
