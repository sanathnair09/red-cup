import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MarginStyles, PaddingStyles, Size} from '../styles/Sizes';
import {Colors} from '../styles/Colors';

export default function ProfileIcon() {
  return (
    <View style={styles.background}>
      <Text>💀</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    ...MarginStyles.m2_r,
    ...PaddingStyles.p2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Size.maxWidth * 0.2,
    width: Size.maxWidth * 0.1,
    height: Size.maxWidth * 0.1,

    backgroundColor: Colors.red,
    // backgroundColor: 'red',
  },
});
