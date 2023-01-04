import {Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Size} from '../styles/Sizes';
import FastImage from 'react-native-fast-image';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
import {Colors} from '../styles/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const CLOSE = 10;

export default function RedCupActionButton() {
  const nav = useNavigation();
  const [expanded, setExpanded] = useState(false);

  const manageStyle = useAnimatedStyle(() => {
    return {
      right: expanded
        ? withSpring(Size.maxWidth * 0.2)
        : withSpring(CLOSE, {overshootClamping: true}),
      top: expanded
        ? withSpring(Size.maxWidth * 0.0175)
        : withSpring(CLOSE, {overshootClamping: true}),
    };
  });
  const notifsStyle = useAnimatedStyle(() => {
    return {
      right: expanded
        ? withSpring(Size.maxWidth * 0.16)
        : withSpring(CLOSE, {overshootClamping: true}),
      top: expanded
        ? withSpring(Size.maxWidth * 0.16)
        : withSpring(CLOSE, {overshootClamping: true}),
    };
  });
  const hostStyles = useAnimatedStyle(() => {
    return {
      right: expanded
        ? withSpring(Size.maxWidth * 0.0175)
        : withSpring(CLOSE, {overshootClamping: true}),
      top: expanded
        ? withSpring(Size.maxWidth * 0.2)
        : withSpring(CLOSE, {overshootClamping: true}),
    };
  });

  const navigateTo = (destination: string) => {
    nav.navigate(destination);
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigateTo('Manage')}>
        <Animated.View style={[styles.manage, styles.smallCircle, manageStyle]}>
          <Icon
            name="clipboard-text-outline"
            size={Size.maxWidth * 0.07}
            color={'white'}
          />
        </Animated.View>
      </Pressable>
      <Pressable onPress={() => navigateTo('Notifications')}>
        <Animated.View style={[styles.notifs, styles.smallCircle, notifsStyle]}>
          <Icon
            name="bell-badge-outline"
            size={Size.maxWidth * 0.07}
            color={'white'}
          />
        </Animated.View>
      </Pressable>
      <Pressable onPress={() => navigateTo('HostInformation')}>
        <Animated.View style={[styles.host, styles.smallCircle, hostStyles]}>
          <Icon name="plus" size={Size.maxWidth * 0.07} color={'white'} />
        </Animated.View>
      </Pressable>
      <Pressable onPress={() => setExpanded(!expanded)}>
        <View style={styles.bigCircle}>
          <FastImage
            source={require('/Users/sanathnair/Developer/RedCup/src/assets/Logo.png')}
            style={styles.image}
          />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: Size.maxWidth * 0.03,
  },
  bigCircle: {
    backgroundColor: '#E0E0E0',
    borderRadius: 50,
    width: Size.maxHeight * 0.07,
    height: Size.maxHeight * 0.07,
    marginRight: Size.maxWidth * 0.01,
  },
  smallCircle: {
    borderRadius: 50,
    width: Size.maxHeight * 0.05,
    height: Size.maxHeight * 0.05,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: Size.maxHeight * 0.07,
    width: Size.maxHeight * 0.07,
  },
  manage: {
    position: 'absolute',
    right: Size.maxWidth * 0.2,
    top: Size.maxWidth * 0.0175,
  },
  notifs: {
    position: 'absolute',
    right: Size.maxWidth * 0.16,
    top: Size.maxWidth * 0.16,
  },
  host: {
    position: 'absolute',
    top: Size.maxWidth * 0.2,
    right: Size.maxWidth * 0.0175,
  },
});
