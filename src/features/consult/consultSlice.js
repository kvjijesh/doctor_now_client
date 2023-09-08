import { createSlice } from "@reduxjs/toolkit";

const consultSlice = createSlice({
  name: "consult",
  initialState: {
    consult: "",
  },
  reducers: {
    setConsult: (state, action) => {
      state.consult = action.payload;
    },
  },
});

export const { setConsult } = consultSlice.actions;
export default consultSlice.reducer;