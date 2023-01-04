import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {MarginStyles, PaddingStyles, Size} from '../styles/Sizes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../styles/Colors';

const IconWithText = ({iconName, text}: {iconName: string; text: string}) => {
  return (
    <View style={styles.container}>
      <Icon name={iconName} size={Size.maxWidth * 0.05} color={'white'} />
      <CustomText style={styles.textStyle}>{text}</CustomText>
    </View>
  );
};

export default IconWithText;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.red,
    borderRadius: Size.maxWidth * 0.01,
    ...MarginStyles.m2_v,
    ...PaddingStyles.p2,
    ...MarginStyles.m3_r,
  },
  textStyle: {
    ...MarginStyles.m1_l,
    fontSize: Size.maxWidth * 0.035,
  },
});
