import { createSlice } from "@reduxjs/toolkit";

const builderSlice = createSlice({
  name: "builder",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push({ id: Date.now(), text: action.payload });
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    }
  },
});

export const { addItem, deleteItem } = builderSlice.actions;
export default builderSlice.reducer;
