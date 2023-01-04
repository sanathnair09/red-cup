import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Nominatim, Party} from '../../utils/types';
import {v4 as uuidv4} from 'uuid';
import {partiesCollection} from '../../firebase/collections';

const initialState: Party = {
  name: '',
  description: '',
  attendees: [],
  max: -1,
  image: '',
  id: '',
  latitude: 0,
  longitude: 0,
  address: '',
  addressData: undefined,
  schoolRestriction: false,
  host: '',
  start: '', // date object
  end: '',
  cost: -1,
  dressCode: '',
  over21: false,
};

export const createNewPartyThunk = createAsyncThunk(
  'firebase/parties/createNewParty',
  async (party: Party) => {
    await partiesCollection.doc(party.id).set({
      name: party.name,
      description: party.description,
      host: party.host,

      image: party.image ? party.image : null,
      attendees: party.attendees,
      id: party.id,

      latitude: party.latitude,
      longitude: party.longitude,
      address: party.address,
      addressData: party.addressData,

      start: party.start,
      end: party.end,

      max: party.max,
      cost: party.cost,
      dressCode: party.dressCode,
      over21: party.over21,
      schoolRestriction: party.schoolRestriction,
    });
  },
);
export const newPartySlice = createSlice({
  name: 'newPartySlice',
  initialState,
  reducers: {
    updateTitleAndDescription: (
      state,
      action: PayloadAction<{title: string; description: string}>,
    ) => {
      state.id = uuidv4();
      state.name = action.payload.title;
      state.description = action.payload.description;
    },
    updateLocationAndTime: (
      state,
      action: PayloadAction<{nominatim: Nominatim; start: string; end: string}>,
    ) => {
      const {nominatim, start, end} = action.payload;
      state.latitude = parseFloat(nominatim.lat);
      state.longitude = parseFloat(nominatim.lon);
      state.address = nominatim.display_name;
      state.addressData = nominatim;
      state.start = start;
      state.end = end;
    },
    updateRestrictions: (
      state,
      action: PayloadAction<{
        over21: boolean;
        dressCode: string;
        cost: string;
        guestLimit: string;
        schoolRestriction: boolean;
      }>,
    ) => {
      const {over21, dressCode, cost, guestLimit, schoolRestriction} =
        action.payload;
      state.over21 = over21;
      state.dressCode = dressCode;
      state.cost = parseFloat(cost);
      state.max = parseInt(guestLimit, 10);
      state.schoolRestriction = schoolRestriction;
    },
    resetHostParty: state => {
      state = initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createNewPartyThunk.fulfilled, (state, action) => {
        console.log('created');
      })
      .addCase(createNewPartyThunk.rejected, (state, action) => {
        console.log('failed');
      });
  },
});

export const {
  updateTitleAndDescription,
  updateLocationAndTime,
  updateRestrictions,
  resetHostParty,
} = newPartySlice.actions;

export default newPartySlice.reducer;
