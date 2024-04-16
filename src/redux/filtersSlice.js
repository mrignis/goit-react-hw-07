import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  term: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.term = action.payload.term;
    },
  },
});

export const { setFilter } = filtersSlice.actions;

export const selectNameFilter = (state) => state.filters.term;

export default filtersSlice.reducer;
