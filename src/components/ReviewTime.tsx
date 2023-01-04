import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {DAYS} from '../utils/Constants';

const ReviewTime = ({date, text}: {date: Date; text: string}) => {
  return (
    <View>
      <CustomText style={styles.title}>{text}</CustomText>
      <CustomText style={styles.date}>{`${
        DAYS[date.getDay()]
      } ${date.toLocaleDateString('default', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })} ${date.toLocaleTimeString('default', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })}`}</CustomText>
    </View>
  );
};

export default ReviewTime;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
  date: {
    fontStyle: 'italic',
  },
});
