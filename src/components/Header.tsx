import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MarginStyles, Size} from '../styles/Sizes';
import CustomText from './CustomText';
import {useNavigation} from '@react-navigation/native';

const Header = ({
  iconName,
  title,
}: {
  iconName: string;
  title: string;
  // prevNav: string;
}) => {
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => nav.goBack()}>
        <Icon name={iconName} size={Size.maxHeight * 0.045} color={'white'} />
      </Pressable>
      <CustomText style={styles.textStyle}>{title}</CustomText>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    ...MarginStyles.m3_b,
  },
  textStyle: {
    ...MarginStyles.m2_l,
    fontSize: Size.maxHeight * 0.04,
    fontWeight: 'bold',
  },
});
