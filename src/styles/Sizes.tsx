import {Dimensions, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('window');

const Size = {
  maxHeight: height,
  maxWidth: width,
  large: height * 0.05,
};

const MarginStyles = StyleSheet.create({
  m1: {
    margin: width * 0.01,
  },
  m1_v: {
    marginVertical: width * 0.01,
  },
  m1_b: {
    marginBottom: width * 0.01,
  },
  m1_h: {
    marginHorizontal: width * 0.01,
  },
  m2: {
    margin: width * 0.02,
  },
  m2_h: {
    marginHorizontal: width * 0.02,
  },
  m2_v: {
    marginVertical: width * 0.02,
  },
  m2_r: {
    marginRight: width * 0.02,
  },
  m2_b: {
    marginBottom: width * 0.02,
  },
  m3_r: {
    marginRight: width * 0.03,
  },
  m3_b: {
    marginBottom: width * 0.03,
  },
  m1_l: {
    marginLeft: width * 0.01,
  },
  m2_l: {
    marginLeft: width * 0.02,
  },
  m3_l: {
    marginLeft: width * 0.03,
  },
  m3_h: {
    marginHorizontal: width * 0.03,
  },
  m3_v: {
    marginVertical: width * 0.03,
  },
  m4_h: {
    marginHorizontal: width * 0.04,
  },
});

const PaddingStyles = StyleSheet.create({
  p1: {
    padding: width * 0.01,
  },
  p2: {
    padding: width * 0.02,
  },
  p3: {
    padding: width * 0.03,
  },
  p5: {
    padding: width * 0.05,
  },
  p2_h: {
    paddingHorizontal: width * 0.02,
  },
  p2_r: {
    paddingRight: width * 0.02,
  },
});

export {Size, MarginStyles, PaddingStyles};
