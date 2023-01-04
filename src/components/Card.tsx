import {StyleSheet, View} from 'react-native';
import React from 'react';
import {MarginStyles, PaddingStyles, Size} from '../styles/Sizes';
import FastImage from 'react-native-fast-image';
import {BlurView} from '@react-native-community/blur';
import CustomText from './CustomText';
import {Party} from '../utils/types';
import {FlexStyles} from '../styles/FlexStyles';
import {FontStyles} from '../styles/FontStyles';

export default function Card({
  data,
  horizontal,
}: {
  data: Party;
  horizontal?: boolean;
}) {
  return (
    <>
      {horizontal ? (
        <View style={styles.backgroundHorizontal}>
          <BlurView blurType="dark" blurAmount={10} style={styles.blurStyle}>
            <FastImage
              source={require('/Users/sanathnair/Developer/RedCup/src/assets/uci.png')}
              style={styles.imageHorizontal}
              // resizeMode={FastImage.resizeMode.contain}
            />
          </BlurView>

          <View style={FlexStyles.flex}>
            <View style={FlexStyles.flex_justifyStart_alignStart}>
              <CustomText style={FontStyles.bold}>{data.name}</CustomText>
            </View>
            <View style={styles.bottomText}>
              <CustomText style={FontStyles.bold}>{data.host}</CustomText>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.background}>
          <BlurView blurType="dark" blurAmount={10} style={styles.blurStyle}>
            <FastImage
              source={require('/Users/sanathnair/Developer/RedCup/src/assets/uci.png')}
              style={styles.image}
              // resizeMode={FastImage.resizeMode.stretch}
            />
          </BlurView>

          <View style={FlexStyles.flex}>
            <View style={FlexStyles.flex_justifyStart_alignStart}>
              <CustomText
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.name}>
                {data.name}
              </CustomText>
              <CustomText numberOfLines={2} ellipsizeMode={'tail'}>
                {data.description}
              </CustomText>
            </View>
            <View style={styles.bottomText}>
              <CustomText style={FontStyles.bold}>{data.host}</CustomText>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    // backgroundColor: 'red',
    ...MarginStyles.m2,
    ...PaddingStyles.p2,
    borderRadius: Size.maxWidth * 0.02,
    height: Size.maxHeight * 0.14,
  },
  backgroundHorizontal: {
    ...MarginStyles.m2,
    ...PaddingStyles.p2,
    borderRadius: Size.maxWidth * 0.02,
    height: Size.maxHeight * 0.14,
    width: Size.maxHeight * 0.12,
  },
  blurStyle: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: Size.maxWidth * 0.02,
    backgroundColor: '#2B2B2B',
  },
  image: {
    height: Size.maxHeight * 0.14,
    opacity: 0.25,
  },
  imageHorizontal: {
    height: Size.maxHeight * 0.14,
    width: Size.maxHeight * 0.12,
    position: 'absolute',
    opacity: 0.25,
  },
  bottomText: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  name: {
    ...FontStyles.bold,
    fontSize: Size.maxHeight * 0.03,
  },
});
