import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {Size} from '../styles/Sizes';
import {Colors} from '../styles/Colors';
import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const NextButton = ({
  text,
  updateState,
  enabled,
}: {
  text: string;
  updateState: () => void;
  enabled: SharedValue<number>;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      enabled.value,
      [0, 1],
      ['rgba(211,211,211,0.5)', Colors.red],
    );
    return {backgroundColor};
  });
  return (
    <Animated.View style={[animatedStyle, styles.button]}>
      <Pressable style={styles.button} onPress={enabled ? updateState : null}>
        <CustomText style={styles.text}>{text}</CustomText>
      </Pressable>
    </Animated.View>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  button: {
    // backgroundColor: Colors.red,
    alignSelf: 'center',
    alignItems: 'center',
    width: Size.maxWidth * 0.94,
    height: Size.maxHeight * 0.055,
    borderRadius: Size.maxWidth * 0.03,
    justifyContent: 'center',
  },
  text: {
    fontSize: Size.maxHeight * 0.03,
    fontWeight: 'bold',
  },
});
