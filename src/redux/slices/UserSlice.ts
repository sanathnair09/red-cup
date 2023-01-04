import {createSlice} from '@reduxjs/toolkit';
import {User} from '../../utils/types';

// type LocalUserState = {
//   user: User;
// };

const initialState: User = {
  name: 'Bobby',
  school: 'UCLA',
  state: 'CA',
  country: 'USA',
  attending: [],
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
