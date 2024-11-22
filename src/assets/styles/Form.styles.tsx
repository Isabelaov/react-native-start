import { Dimensions, StyleSheet } from 'react-native';
import { baseColors } from '../colors/baseColors';

const { height } = Dimensions.get('window');

export const FormStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: baseColors.primary,
  },
  container: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: baseColors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    margin: 10,
    color: '#000',
  },
  button: {
    backgroundColor: baseColors.primary,
    padding: 5,
    borderRadius: 10,
    margin: 10,
    width: 150,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: baseColors.buttonText,
  },
  pictureContainer: {
    alignItems: 'center',
    margin: 15,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 95,
  },
  placeholder: {
    width: 150,
    height: 150,
    borderRadius: 95,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultPic: {
    fontSize: 50,
    color: 'black',
  },
  map: {
    height: height * 0.5,
    width: 310,
    alignSelf: 'center',
    marginVertical: 20,
  },
});
