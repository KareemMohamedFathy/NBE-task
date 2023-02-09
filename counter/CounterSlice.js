import {createSlice} from '@reduxjs/toolkit';
import strings from '../components/Language/AuthNames';
import drawerstrings from '../components/Language/AuthNames';

const initialState = {
  value: 'en',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeLanguage: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = state.value == 'ar' ? 'en' : 'ar';
      strings.setLanguage(state.value);
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {changeLanguage} = counterSlice.actions;

export default counterSlice.reducer;
