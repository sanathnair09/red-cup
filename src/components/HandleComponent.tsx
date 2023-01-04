import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Size} from '../styles/Sizes';

const HandleComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.handle} />
    </View>
  );
};

export default HandleComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: Size.maxHeight * 0.03,
    // backgroundColor: 'red',

    borderRadius: Size.maxWidth * 0.03,
    // marginBottom: Size.maxHeight * 0.005
  },
  handle: {
    backgroundColor: '#ADACAC',
    height: Size.maxHeight * 0.0035,
    width: Size.maxWidth / 5,
    borderRadius: Size.maxWidth * 0.02,
  },
});
