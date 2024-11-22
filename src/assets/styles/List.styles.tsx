import { StyleSheet } from 'react-native';
import { baseColors } from '../colors/baseColors';

export const List = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  picture: {
    width: 70,
    height: 70,
    borderRadius: 25,
    marginRight: 10,
  },
  placeholder: {
    width: 70,
    height: 70,
    borderRadius: 25,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  placeholderText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  tag: {
    backgroundColor: baseColors.primary,
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 20,
    width: 80,
    textAlign: 'center',
  },
  tagText: {
    color: '#fff',
    fontSize: 15,
  },
});
