import { createReducer } from "@reduxjs/toolkit";
import { getDataError, getDataRequest, getDataSuccess } from "./actions";

const initialState =  {
    logs: [],
    loading: false,
    error: null,
  };



const logsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getDataRequest, (state, action) => {
      state.loading = true;
    })
    .addCase(getDataSuccess, (state, action) => {
        state.logs = [...state.logs, action.payload];
      state.loading = false;
    })
    .addCase(getDataError, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
});

export default logsReducer;
