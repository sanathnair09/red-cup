import {StyleSheet, SafeAreaView, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/Header';
import CustomText from '../../../components/CustomText';
import {MarginStyles, PaddingStyles, Size} from '../../../styles/Sizes';
import CustomTextInput from '../../../components/CustomTextInput';
import {Colors} from '../../../styles/Colors';
import {useNavigation} from '@react-navigation/native';
import {LOREUM} from '../../../utils/Constants';
import {useDispatch, useSelector} from 'react-redux';
import {updateTitleAndDescription} from '../../../redux/slices/CreatePartySlice';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {AppDispatch, RootState} from '../../../redux/store';
import NextButton from '../../../components/NextButton';
import {runOnJS, useDerivedValue, withTiming} from 'react-native-reanimated';
import {FlexStyles} from '../../../styles/FlexStyles';

export default function HostPartyInformation() {
  const nav = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const {name, description} = useSelector((state: RootState) => state.newParty);

  const [title, setTitle] = useState(name);
  const [descriptionLocal, setDescriptionLocal] = useState(description);

  const [titleStatus, setTitleStatus] = useState(false);
  const [descriptionStatus, setDescriptionStatus] = useState(false);
  // const [visibility, setVisibility] = useState(false);

  const validateInput = () => {
    console.log(title.length);
    console.log(descriptionLocal.length);

    return title.length > 0 && descriptionLocal.length > 0;
  };
  const enabled = useDerivedValue(() => {
    return runOnJS(validateInput) ? withTiming(1) : withTiming(0);
  }, [title, descriptionLocal]);
  const updateState = () => {
    if (validateInput()) {
      setTitleStatus(false);
      setDescriptionStatus(false);
      dispatch(
        updateTitleAndDescription({
          title: title,
          description: descriptionLocal,
        }),
      );
      nav.navigate('HostLocation');
    } else {
      if (title.length === 0) {
        setTitleStatus(true);
      } else {
        setTitleStatus(false);
      }
      if (descriptionLocal.length === 0) {
        setDescriptionStatus(true);
      } else {
        setDescriptionStatus(false);
      }
      Toast.show({
        text1: 'Invalid Party Title and/or Description',
        text2: "Please add your party's name and/or description",
        type: 'error',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={FlexStyles.flex}>
        <Header iconName="chevron-left-circle-outline" title="New Party" />
        <CustomText style={styles.text}>Party Title</CustomText>
        <CustomTextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Bob's 2022 Bash"
          error={titleStatus}
        />
        <CustomText style={styles.text}>Party Description</CustomText>
        <CustomTextInput
          value={descriptionLocal}
          onChangeText={setDescriptionLocal}
          style={{height: Size.maxHeight * 0.3}}
          multiline
          // numberOfLines={5}
          placeholder={LOREUM}
          error={descriptionStatus}
        />
        {/* <SwitchWithText
          visibility={visibility}
          setVisibility={setVisibility}
          text="Private"
          bold
        /> */}
      </View>
      <NextButton text="Next" updateState={updateState} enabled={enabled} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...MarginStyles.m3_h,

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
  visibilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...MarginStyles.m3_v,
  },
});
