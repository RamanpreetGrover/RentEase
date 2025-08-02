// redux/store.js
// This file creates and exports the main Redux store

import { configureStore } from '@reduxjs/toolkit';
import rentReducer from './rentSlice';

const store = configureStore({
  reducer: {
    rent: rentReducer, // add more slices here if needed
  },
});

export default store;
