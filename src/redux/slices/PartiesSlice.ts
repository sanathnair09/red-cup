import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {partiesCollection, userCollection} from '../../firebase/collections';
import {CurrentParty, Party, User} from '../../utils/types';

type PartyListState = {
  availableParties: Party[];
  attendingParties: Party[];
  currentParty: CurrentParty | undefined;
  loading: boolean;
};

const initialState: PartyListState = {
  availableParties: [],
  attendingParties: [],
  currentParty: undefined,
  loading: false,
};
export const getPartiesUserHasNotJoined = createAsyncThunk(
  'firebase/user/partiesNotJoined',
  async (userId: string) => {
    const notAttendingIds: string[] = [];
    const attendingIds: string[] = [];

    const list = (await partiesCollection.get()).docs;
    const user = (await userCollection.doc(userId).get()).data() as
      | User
      | undefined;
    if (user) {
      const attending = user.attending;
      list.forEach(doc => {
        if (!attending.includes(doc.id)) {
          notAttendingIds.push(doc.id);
        } else {
          attendingIds.push(doc.id);
        }
      });
    }
    const availableParties: Party[] = [];
    const attendingParties: Party[] = [];

    for (let x = 0; x < notAttendingIds.length; x++) {
      const id = notAttendingIds[x];
      const data = (await partiesCollection.doc(id).get()).data();
      if (data) {
        availableParties.push(data as Party);
      }
    }
    for (let x = 0; x < attendingIds.length; x++) {
      const id = attendingIds[x];
      const data = (await partiesCollection.doc(id).get()).data();
      if (data) {
        attendingParties.push(data as Party);
      }
    }
    return {
      availableParties: availableParties,
      attendingParties: attendingParties,
    };
  },
);

export const partyListSlice = createSlice({
  name: 'partyList',
  initialState,
  reducers: {
    setCurrentParty: (
      state,
      action: PayloadAction<{
        id: string;
        attending: boolean;
      }>,
    ) => {
      for (let x = 0; x < state.availableParties.length; ++x) {
        if (state.availableParties[x].id === action.payload.id) {
          state.currentParty = {
            party: state.availableParties[x],
            attending: action.payload.attending!,
          };
          return;
        }
      }
      for (let x = 0; x < state.attendingParties.length; ++x) {
        if (state.attendingParties[x].id === action.payload.id) {
          state.currentParty = {
            party: state.attendingParties[x],
            attending: action.payload.attending!,
          };
          return;
        }
      }
    },
    clearCurrentParty: state => {
      state.currentParty = undefined;
    },
    updateAvailableParties: (
      state,
      action: PayloadAction<{availableParties: Party[]}>,
    ) => {
      state.availableParties = action.payload.availableParties;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPartiesUserHasNotJoined.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(getPartiesUserHasNotJoined.fulfilled, (state, action) => {
        state.loading = false;
        state.availableParties = action.payload.availableParties;
        state.attendingParties = action.payload.attendingParties;
      })
      .addCase(getPartiesUserHasNotJoined.rejected, (state, _) => {
        state.loading = false;
      });
  },
});

export const {setCurrentParty, clearCurrentParty, updateAvailableParties} =
  partyListSlice.actions;

export default partyListSlice.reducer;
