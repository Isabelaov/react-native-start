import { StyleSheet } from 'react-native';
import { baseColors } from '../colors/baseColors';

export const SeparatorHorizontal = StyleSheet.create({
  separator: {
    height: 5,
    borderWidth: 1,
    borderColor: baseColors.primary,
    backgroundColor: baseColors.primary,
    marginVertical: 5,
  },
});
