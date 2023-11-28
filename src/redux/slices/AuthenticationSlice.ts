import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type AuthState = {
  loggedIn: boolean;
};

const initialState: AuthState = {
  loggedIn: false,
};

export const authenticationSlice = createSlice({
  name: 'authenticationSlice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{}>) => {
      // state.loggedIn = true;
    },
  },
});

export default authenticationSlice.reducer;
export const {} = authenticationSlice.actions;
