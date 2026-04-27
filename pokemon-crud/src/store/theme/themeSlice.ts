import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: localStorage.getItem("theme") || "synthwave", 
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
    reducers: {
        toggleTheme: (state) => {
        state.mode = state.mode === "light" ? "synthwave" : "light";
        localStorage.setItem("theme", state.mode);
        },
    },
});


export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;