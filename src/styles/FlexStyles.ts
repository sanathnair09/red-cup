import {StyleSheet} from 'react-native';

export const FlexStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  flex_row_alignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flex_justifyStart_alignStart: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
