import {SwitchProps} from 'react-native';
import React from 'react';
import {Switch} from 'react-native-gesture-handler';
import {Colors} from '../styles/Colors';

const CustomSwitch = ({value, onValueChange}: SwitchProps) => {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{true: 'rgba(255,57,66,0.35)', false: Colors.coolgray}}
      thumbColor={Colors.red}
    />
  );
};

export default CustomSwitch;
