import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {TextProps} from 'react-native';

export default function CustomText({children, style, ...rest}: TextProps) {
  return (
    <Text style={[styles.format, style]} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  format: {
    fontFamily: 'Urbanist',
    color: 'white',
  },
});
