// redux/rentSlice.js
// This slice handles rent payment data fetched from Firestore

import { createSlice } from '@reduxjs/toolkit';

const rentSlice = createSlice({
  name: 'rent',
  initialState: {
    payments: [],       // list of rent payments
    loading: false,     // loading state
    error: null,        // error state
  },
  reducers: {
    setPayments(state, action) {
      state.payments = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

// Export actions to be used in components
export const { setPayments, setLoading, setError } = rentSlice.actions;

// Export reducer to be included in store
export default rentSlice.reducer;
