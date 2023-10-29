import { createSlice } from "@reduxjs/toolkit";

interface FilterState {
  hasPark: boolean;
  hasNightSkiing: boolean;
  hasChairlift: boolean;
  hasGondola: boolean;
  isCertified: boolean;

  minElevationDifference: number;
  minBaseElevation: number;
  minTotalPiste: number;
  minTotalLifts: number;
  maxDayPassPrice: number;
}

const initialState: FilterState = {
  hasPark: false,
  hasNightSkiing: false,
  hasChairlift: false,
  hasGondola: false,
  isCertified: false,

  minElevationDifference: 0,
  minBaseElevation: 0,
  minTotalPiste: 0,
  minTotalLifts: 0,
  maxDayPassPrice: 200,
};

export const filterSlice = createSlice({
  name: "filter",
  // createSlice will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleHasPark: (state) => {
      state.hasPark = !state.hasPark;
    },
    toggleHasNightSkiing: (state) => {
      state.hasNightSkiing = !state.hasNightSkiing;
    },
    toggleHasChairlift: (state) => {
      state.hasChairlift = !state.hasChairlift;
    },
    toggleHasGondola: (state) => {
      state.hasGondola = !state.hasGondola;
    },
    toggleIsCertified: (state) => {
      state.isCertified = !state.isCertified;
    },
    setMinElevationDifference: (state, action) => {
      state.minElevationDifference = action.payload;
    },
    setMinBaseElevation: (state, action) => {
      state.minBaseElevation = action.payload;
    },
    setMinTotalPiste: (state, action) => {
      state.minTotalPiste = action.payload;
    },
    setMinTotalLifts: (state, action) => {
      state.minTotalLifts = action.payload;
    },
    setMaxDayPassPrice: (state, action) => {
      state.maxDayPassPrice = action.payload;
    },
  },
});

export const {
  toggleHasPark,
  toggleHasNightSkiing,
  toggleHasChairlift,
  toggleHasGondola,
  toggleIsCertified,

  setMinElevationDifference,
  setMinBaseElevation,
  setMinTotalPiste,
  setMinTotalLifts,
  setMaxDayPassPrice,
} = filterSlice.actions;

export default filterSlice.reducer;
