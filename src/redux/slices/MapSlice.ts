import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DEFAULT_LAT_DELTA, DEFAULT_LON_DELTA} from '../../utils/lib';
import {Coord} from '../../utils/types';

export type MapState = {
  userCoords: Coord;
  latDelta: number;
  lonDelta: number;
  currentMarker: Coord | undefined;
};

const initialState: MapState = {
  userCoords: {latitude: 0, longitude: 0},
  latDelta: DEFAULT_LAT_DELTA,
  lonDelta: DEFAULT_LON_DELTA,
  currentMarker: undefined,
};

export const mapSlice = createSlice({
  name: 'mapSlice',
  initialState,
  reducers: {
    updateUserLocation: (state, action: PayloadAction<Coord>) => {
      state.userCoords = {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    },
    updateMapDeltas: (state, action: PayloadAction<number[]>) => {
      state.latDelta = action.payload[0];
      state.lonDelta = action.payload[1];
    },
    updateCurrentMarker: (state, action: PayloadAction<Coord>) => {
      state.currentMarker = action.payload;
    },
    clearCurrentMarker: state => {
      state.currentMarker = undefined;
    },
  },
});

export default mapSlice.reducer;
export const {
  updateUserLocation,
  updateMapDeltas,
  updateCurrentMarker,
  clearCurrentMarker,
} = mapSlice.actions;
