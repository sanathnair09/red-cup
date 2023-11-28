import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

export type RootStackParamList = {
  // logged in
  Map: undefined;
  HostLocation: undefined;
  HostRestriction: undefined;
  HostReview: undefined;
  Notifications: undefined;
  Manage: undefined;

  // signup
  Login: undefined;
  SignUp: undefined;
  AddlInfo: undefined;
};

