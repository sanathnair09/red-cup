import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type AuthState = {
  user?: FirebaseAuthTypes.User;
  loggedIn: boolean;
};

const initialState: AuthState = {
  user: undefined,
  loggedIn: false,
};

export const authenticationSlice = createSlice({
  name: 'authenticationSlice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{user: FirebaseAuthTypes.User}>) => {
      state.user = action.payload.user;
      state.loggedIn = true;
    },
  },
});

export default authenticationSlice.reducer;
export const {} = authenticationSlice.actions;
