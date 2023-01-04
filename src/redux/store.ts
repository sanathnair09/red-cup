import {configureStore} from '@reduxjs/toolkit';
import partyListReducer from './slices/PartiesSlice';
import mapReducer from './slices/MapSlice';
import {nominatimAPI} from './slices/Nominatim';
import UserReducer from './slices/UserSlice';
import newPartyReducer from './slices/CreatePartySlice';
import authenticationReducer from './slices/AuthenticationSlice';

export const store = configureStore({
  reducer: {
    [nominatimAPI.reducerPath]: nominatimAPI.reducer,
    parties: partyListReducer,
    map: mapReducer,
    user: UserReducer,
    newParty: newPartyReducer,
    authentication: authenticationReducer,
  },
  middleware: defaultMiddleware =>
    defaultMiddleware().concat(nominatimAPI.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
