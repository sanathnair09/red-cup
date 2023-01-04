import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MarginStyles, Size} from '../styles/Sizes';
import {Colors} from '../styles/Colors';

interface PasswordCriteriaProps {
  criteria: string;
  met: boolean;
}

const PasswordCriteria = ({criteria, met}: PasswordCriteriaProps) => {
  return (
    <View style={styles.container}>
      {met ? (
        <Icon
          name={'check-circle'}
          size={Size.maxHeight * 0.03}
          color={Colors.succes}
        />
      ) : (
        <Icon
          name={'alert-circle'}
          size={Size.maxHeight * 0.03}
          color={Colors.error}
        />
      )}
      <CustomText style={styles.text}>{criteria}</CustomText>
    </View>
  );
};

export default PasswordCriteria;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    ...MarginStyles.m2_b,
  },
  text: {
    ...MarginStyles.m2_l,
  },
});
