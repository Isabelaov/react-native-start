import { StyleSheet } from 'react-native';
import { baseColors } from '../colors/baseColors';

export const CheckBoxStyles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: baseColors.primary,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  checkboxLabel: {
    fontSize: 15,
    marginLeft: 10,
  },
});

export const tintColors = {
  true: baseColors.primary,
  false: baseColors.secondary,
};
