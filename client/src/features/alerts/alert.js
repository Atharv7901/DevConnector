import {createSlice, nanoid} from "@reduxjs/toolkit";

const initialState = [];

const alertSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      const id = nanoid();
      state.push({id, ...action.payload});
    },
    removeAlert: (state, action) => {
      const index = state.findIndex((alert) => alert.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const {setAlert, removeAlert} = alertSlice.actions;

export default alertSlice.reducer;
