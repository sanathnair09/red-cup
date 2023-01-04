import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {MarginStyles, PaddingStyles, Size} from '../styles/Sizes';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../styles/Colors';

export default function SearchBar() {
  const [text, onChangeText] = useState('');
  return (
    <View style={styles.background}>
      <Icon name="magnify" size={Size.maxWidth * 0.07} color={Colors.red} />
      <BottomSheetTextInput
        value={text}
        onChangeText={onChangeText}
        style={styles.textinput}
        placeholder="Search Parties"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    ...MarginStyles.m2_h,
    ...PaddingStyles.p2,
    flex: 1,
    borderRadius: Size.maxWidth * 0.02,
    backgroundColor: '#E7E7E7',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textinput: {
    flex: 1,
    ...MarginStyles.m1_l,
  },
});
