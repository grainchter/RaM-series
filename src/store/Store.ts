import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISeriesArray } from "../interfaces/interfaces";
type TPayload = {
  seriesArray?: Array<ISeriesArray> | ISeriesArray | any;
  filterArray?: any;
  search?: string;
  sortByName?: boolean;
  sortByNameReverse?: boolean;
  sortByDate?: boolean;
  sortByDateReverse?: boolean;
  seasonsArray?: any;
  isLoad?: boolean;
};

interface storeState {
  seriesArray: Array<ISeriesArray> | ISeriesArray | any;
  filterArray: any;
  search?: string;
  sortByName?: boolean;
  sortByNameReverse?: boolean;
  sortByDate?: boolean;
  sortByDateReverse?: boolean;
  seasonsArray?: any;
  isLoad: boolean;
}

const initialState = {
  seriesArray: [],
  filterArray: {
    search: "",
    sortByName: false,
    sortByNameReverse: false,
    sortByDate: false,
    sortByDateReverse: false,
  },
  seasonsArray: [],
  isLoad: true,
} as storeState;

const storeSlice = createSlice({
  name: "editValues",
  initialState: initialState,
  reducers: {
    changeValue: (state: any, { payload }: PayloadAction<TPayload>) => {
      state.seriesArray.push(payload.seriesArray);
    },
    changeFilter: (state: any, { payload }: PayloadAction<TPayload>) => {
      state.filterArray = payload.filterArray;
    },
    changeSeasons: (state: any, { payload }: PayloadAction<TPayload>) => {
      state.seasonsArray = payload.seasonsArray;
    },
    changeLoad: (state: any, { payload }: PayloadAction<TPayload>) => {
      state.isLoad = payload.isLoad;
    },
  },
});

export const { changeValue, changeFilter, changeSeasons, changeLoad } =
  storeSlice.actions;

export const storeReducer = storeSlice.reducer;
