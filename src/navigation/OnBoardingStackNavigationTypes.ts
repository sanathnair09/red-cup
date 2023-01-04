import {NativeStackScreenProps} from '@react-navigation/native-stack';

type OnBoardingStack = {
  OnBoardingScreen_1: undefined;
  OnBoardingScreen_2: undefined;
  OnBoardingScreen_3: undefined;
};

type OnBoardingScreen_1_Props = NativeStackScreenProps<
  OnBoardingStack,
  'OnBoardingScreen_1'
>;
type OnBoardingScreen_2_Props = NativeStackScreenProps<
  OnBoardingStack,
  'OnBoardingScreen_2'
>;
type OnBoardingScreen_3_Props = NativeStackScreenProps<
  OnBoardingStack,
  'OnBoardingScreen_3'
>;

export type {
  OnBoardingStack,
  OnBoardingScreen_1_Props,
  OnBoardingScreen_2_Props,
  OnBoardingScreen_3_Props,
};
