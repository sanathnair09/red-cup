import {Alert, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {Colors} from '../../styles/Colors';
import {MarginStyles, PaddingStyles, Size} from '../../styles/Sizes';
import CustomText from '../../components/CustomText';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NextButton from '../../components/NextButton';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useDerivedValue, withTiming} from 'react-native-reanimated';

const CreateAccountProfile = () => {
  const nav = useNavigation();
  // state vars
  const [fullName, setFullName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [dob, setDob] = useState<Date>(new Date());
  const [gradYear, setGradYear] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  // error vars
  // other
  const enabled = useDerivedValue(() => {
    return fullName && phoneNo && gradYear && country && state
      ? withTiming(1)
      : withTiming(0);
  }, [fullName, phoneNo, gradYear, country, state]);
  const updateState = () => {
    if (fullName && phoneNo && gradYear && country && state) {
      // nav.navigate('AddlInfo');
      Alert.alert('Worked');
    } else {
      Toast.show({
        text1: 'Empty Field',
        text2: 'Make sure to fill all fields',
        type: 'error',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header iconName="chevron-left-circle-outline" title="Profile" />
      <View style={styles.innerContainer}>
        <CustomTextInput
          placeholder="Full Name"
          leftIcon="card-account-details-outline"
          value={fullName}
          onChangeText={setFullName}
        />
        <CustomTextInput
          placeholder="Phone Number"
          leftIcon="phone-outline"
          keyboardType="phone-pad"
          value={phoneNo}
          onChangeText={setPhoneNo}
        />

        <View style={[styles.dateContainer]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name={'cake-variant-outline'}
              size={Size.maxHeight * 0.03}
              color={'rgba(255,255,255,0.6)'}
            />
            <CustomText
              style={{color: 'rgba(255,255,255,0.6)', ...MarginStyles.m3_l}}>
              Date of Birth
            </CustomText>
          </View>
          <RNDateTimePicker
            value={dob}
            onChange={event => {
              setDob(new Date(event.nativeEvent.timestamp!));
            }}
            mode="date"
            accentColor={Colors.red}
          />
        </View>
        <CustomTextInput
          placeholder="Graduating Class"
          leftIcon="school-outline"
          keyboardType="number-pad"
          value={gradYear}
          onChangeText={setGradYear}
        />
        <CustomTextInput
          placeholder="Country"
          leftIcon="earth"
          value={country}
          onChangeText={setCountry}
        />
        <CustomTextInput
          placeholder="State"
          leftIcon="earth"
          value={state}
          onChangeText={setState}
        />
      </View>
      <NextButton
        text="Create Account"
        updateState={updateState}
        enabled={enabled}
      />
    </SafeAreaView>
  );
};

export default CreateAccountProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...PaddingStyles.p2_h,
  },
  innerContainer: {
    flex: 1,
    ...MarginStyles.m2,
    justifyContent: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...MarginStyles.m3_b,
    ...PaddingStyles.p2,
    backgroundColor: Colors.coolgray,
    borderRadius: Size.maxWidth * 0.02,
  },
});
