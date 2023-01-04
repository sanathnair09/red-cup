import {StyleSheet, View} from 'react-native';
import React from 'react';
import {MarginStyles, Size} from '../styles/Sizes';
import FastImage from 'react-native-fast-image';
import CustomText from './CustomText';
import {User} from '../utils/types';
import {FlexStyles} from '../styles/FlexStyles';

const IMAGE_SIZE = Size.maxHeight * 0.05;

const AttendeeCard = ({data}: {data: User}) => {
  return (
    <View style={styles.container}>
      <View style={FlexStyles.flex_row_alignCenter}>
        <FastImage
          source={require('/Users/sanathnair/Developer/RedCup/src/assets/uci.png')}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
        />
        <CustomText>{`${data.name}`}</CustomText>
      </View>
      <CustomText>{data.school}</CustomText>
    </View>
  );
};

export default AttendeeCard;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...MarginStyles.m2_v,
  },
  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderRadius: Size.maxHeight * 0.05,
    ...MarginStyles.m2_r,
  },
});
