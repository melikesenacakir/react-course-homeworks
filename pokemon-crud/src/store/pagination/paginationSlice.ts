import { createSlice } from "@reduxjs/toolkit";
import type { PaginationState } from "../../types/pagination";
import type { PayloadAction } from "@reduxjs/toolkit";


const initialState: PaginationState = {
    pokemonPagination: {
        page: 1,
        limit: 3
    },
};

export type PaginationKey = keyof PaginationState;

const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<{ key: PaginationKey; page: number }>) => {
          const { key, page } = action.payload;
          state[key].page = page;
        },
        setLimit: (state, action: PayloadAction<{ key: PaginationKey; limit: number }>) => {
          const { key, limit } = action.payload;
          state[key].limit = limit;
        },
    },
});

export const { setPage, setLimit } = paginationSlice.actions;
export default paginationSlice.reducer;
