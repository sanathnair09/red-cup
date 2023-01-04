import {StyleSheet, View} from 'react-native';
import React, {SetStateAction} from 'react';
import CustomText from './CustomText';
import CustomSwitch from './CustomSwitch';
import {MarginStyles, Size} from '../styles/Sizes';
import {FontStyles} from '../styles/FontStyles';

const SwitchWithText = ({
  visibility,
  setVisibility,
  text,
  bold,
}: {
  visibility: boolean;
  setVisibility: React.Dispatch<SetStateAction<boolean>>;
  text?: string;
  bold?: boolean;
}) => {
  return (
    <View style={styles.visibilityContainer}>
      <CustomText style={[styles.text, bold ? FontStyles.bold : null]}>
        {text}
      </CustomText>

      <CustomSwitch value={visibility} onValueChange={setVisibility} />
    </View>
  );
};

export default SwitchWithText;

const styles = StyleSheet.create({
  visibilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...MarginStyles.m2_v,
  },
  text: {
    fontSize: Size.maxHeight * 0.02,
  },
});
