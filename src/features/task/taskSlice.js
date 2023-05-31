import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: "",
  completed: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    handleTaskSearch: (state, action) => {
      state.searchText = action.payload;
    },
    handleCompleted: (state, action) => {
      console.log(action.payload);
      state.completed = action.payload;
    },
  },
});

export const { handleTaskSearch, handleCompleted } = taskSlice.actions;
export default taskSlice.reducer;
