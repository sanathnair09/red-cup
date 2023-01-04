import {StyleSheet, SafeAreaView} from 'react-native';
import React, {useCallback, useState} from 'react';
import Header from '../../../components/Header';
import CustomText from '../../../components/CustomText';
import {MarginStyles, PaddingStyles, Size} from '../../../styles/Sizes';
import CustomTextInput from '../../../components/CustomTextInput';
import {Colors} from '../../../styles/Colors';
import SwitchWithText from '../../../components/SwitchWithText';
import {useNavigation} from '@react-navigation/native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {updateRestrictions} from '../../../redux/slices/CreatePartySlice';
import {ScrollView} from 'react-native-gesture-handler';
import {AppDispatch, RootState} from '../../../redux/store';
import NextButton from '../../../components/NextButton';
import {runOnJS, useDerivedValue, withTiming} from 'react-native-reanimated';
import {validate} from 'uuid';

export default function HostPartyRestriction() {
  const nav = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const {over21, dressCode, cost, max, schoolRestriction} = useSelector(
    (state: RootState) => state.newParty,
  );

  // state vars
  const [over21Local, setOver21Local] = useState(over21);
  const [dressCodeLocal, setDressCodeLocal] = useState(
    dressCode ? true : false,
  );
  const [dressCodeText, setDressCodeText] = useState(dressCode);
  const [paidEntry, setPaidEntry] = useState(cost !== -1 ? true : false);
  const [paidEntryText, setPaidEntryText] = useState(
    cost !== -1 ? cost.toString() : '',
  );
  const [guestLimit, setGuestLimit] = useState(max !== -1 ? true : false);
  const [guestLimitText, setGuestLimitText] = useState(
    max !== -1 ? max.toString() : '',
  );

  const [schoolRestrictionLocal, setSchoolRestrictionLocal] =
    useState(schoolRestriction);
  // status vars
  const [dressCodeStatus, setDressCodeStatus] = useState(false);
  const [paidEntryStatus, setPaidEntryStatus] = useState(false);
  const [guestLimitStatus, setGuestLimitStatus] = useState(false);

  const validateInputs = useCallback(
    () => () => {
      let temp1 = true;
      let temp2 = true;
      let temp3 = true;

      if (dressCodeLocal) {
        if (dressCodeText.length > 0) {
          setDressCodeStatus(false);
        } else {
          setDressCodeStatus(true);
          temp1 = false;
        }
      }
      if (paidEntry) {
        if (
          paidEntryText.length > 0 &&
          !isNaN(parseFloat(paidEntryText)) &&
          parseFloat(paidEntryText) > 0
        ) {
          setPaidEntryStatus(false);
        } else {
          setPaidEntryStatus(true);
          temp2 = false;
        }
      }
      if (guestLimit) {
        if (
          guestLimitText.length > 0 &&
          !isNaN(parseInt(guestLimitText, 10)) &&
          parseInt(guestLimitText, 10) > 0
        ) {
          setGuestLimitStatus(false);
        } else {
          setGuestLimitStatus(true);
          temp3 = false;
        }
      }

      return temp1 && temp2 && temp3;
    },
    [
      dressCodeLocal,
      dressCodeText,
      guestLimit,
      guestLimitText,
      paidEntry,
      paidEntryText,
    ],
  );
  const enabled = useDerivedValue(() => {
    return runOnJS(validateInputs) ? withTiming(1) : withTiming(0);
  }, [validate]);
  const updateState = () => {
    if (validateInputs()) {
      dispatch(
        updateRestrictions({
          over21: over21Local,
          dressCode: dressCodeText,
          cost: paidEntry ? paidEntryText : '-1',
          guestLimit: guestLimit ? guestLimitText : '-1',
          schoolRestriction: schoolRestrictionLocal,
        }),
      );
      nav.navigate('HostReview');
      //nav
    } else {
      Toast.show({
        text1: 'Missing details',
        text2: 'Please include more info for the given restrictions',
        type: 'error',
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}} keyboardShouldPersistTaps="handled">
        <Header iconName="chevron-left-circle-outline" title="Restrictions" />
        <CustomText style={styles.text}>Guest Restrictions</CustomText>
        <SwitchWithText
          visibility={over21Local}
          setVisibility={setOver21Local}
          text="Restricted to 21+"
        />
        <SwitchWithText
          visibility={dressCodeLocal}
          setVisibility={setDressCodeLocal}
          text="Dress Code"
        />
        {dressCodeLocal ? (
          <CustomTextInput
            placeholder="Ex. Costumes Required"
            value={dressCodeText}
            onChangeText={setDressCodeText}
            error={dressCodeStatus}
          />
        ) : null}
        <SwitchWithText
          visibility={paidEntry}
          setVisibility={setPaidEntry}
          text="Paid Entry"
        />
        {paidEntry ? (
          <CustomTextInput
            placeholder="Ex. $10 (Don't include $ sign)"
            value={paidEntryText}
            onChangeText={setPaidEntryText}
            error={paidEntryStatus}
            keyboardType="numeric"
          />
        ) : null}
        <SwitchWithText
          visibility={guestLimit}
          setVisibility={setGuestLimit}
          text="Guest Limit"
        />
        {guestLimit ? (
          <CustomTextInput
            placeholder="Ex. 100"
            value={guestLimitText}
            onChangeText={setGuestLimitText}
            error={guestLimitStatus}
            keyboardType="number-pad"
          />
        ) : null}
        <SwitchWithText
          visibility={schoolRestrictionLocal}
          setVisibility={setSchoolRestrictionLocal}
          text="School Restriction"
        />
      </ScrollView>
      <NextButton text="Next" updateState={updateState} enabled={enabled} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...MarginStyles.m2_h,
    ...PaddingStyles.p2,
  },
  text: {
    fontSize: Size.maxHeight * 0.02,
    fontWeight: 'bold',
    ...MarginStyles.m2_v,
  },
  button: {
    backgroundColor: Colors.red,
    alignSelf: 'center',
    alignItems: 'center',
    width: Size.maxWidth * 0.9,
    height: Size.maxHeight * 0.055,
    borderRadius: Size.maxWidth * 0.03,
    justifyContent: 'center',
  },
});
