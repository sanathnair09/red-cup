import {StyleSheet, TextInputProps, View} from 'react-native';
import React from 'react';
import {MarginStyles, PaddingStyles, Size} from '../styles/Sizes';
import {Colors} from '../styles/Colors';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FlexStyles} from '../styles/FlexStyles';

interface CustomTextInputProps extends TextInputProps {
  error?: boolean;
  errorValue?: boolean;
  leftIcon?: string;
}

export default function CustomTextInput({
  value,
  onChangeText,
  error,
  errorValue,
  leftIcon,
  ...rest
}: CustomTextInputProps) {
  return (
    <View
      style={[
        styles.container,
        leftIcon ? {...PaddingStyles.p2_h} : {...PaddingStyles.p2_r},
      ]}>
      {leftIcon ? (
        <Icon name={leftIcon} size={Size.maxHeight * 0.03} color={Colors.red} />
      ) : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        selectionColor={Colors.red}
        placeholderTextColor={'rgba(255,255,255,0.6)'}
        {...rest}
        style={styles.format}
      />
      {value ? (
        error ? (
          errorValue ? (
            <Icon
              name={'alert-circle'}
              size={Size.maxHeight * 0.03}
              color={Colors.error}
            />
          ) : (
            <Icon
              name={'check-circle'}
              size={Size.maxHeight * 0.03}
              color={Colors.succes}
            />
          )
        ) : null
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...MarginStyles.m3_b,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.coolgray,
    borderRadius: Size.maxWidth * 0.02,
  },
  format: {
    ...PaddingStyles.p3,
    ...FlexStyles.flex,
    fontFamily: 'Urbanist',
    color: 'white',
    alignItems: 'center',
  },
  error: {
    borderColor: Colors.red,
    borderWidth: 2,
  },
});
