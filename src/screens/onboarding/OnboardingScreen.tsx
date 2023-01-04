import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../../styles/Colors';
import {Size, width} from '../../styles/Sizes';
import CustomText from '../../components/CustomText';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

export default function OnboardingScreen() {
  const x = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
    },
    onEnd: _ => {
      x.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
      ],
    };
  });
  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.background, animatedStyle]}>
        <View style={styles.content}>
          <Image
            style={{
              width: width * 0.5,
              height: width * 0.5,
            }}
            source={{
              uri: '/Users/sanathnair/Developer/RedCup/src/assets/Logo.png',
            }}
          />
          <View style={styles.textHolder}>
            <CustomText style={styles.redText}>Red</CustomText>
            <CustomText style={styles.whiteText}>Cup</CustomText>
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
  },
  text: {
    color: 'white',
  },
  textHolder: {
    flexDirection: 'row',
    left: -width * 0.15,
  },
  redText: {
    color: Colors.red,
    fontSize: Size.large,
  },
  whiteText: {
    color: Colors.buttonPrimaryText,
    fontSize: Size.large,
  },
});
