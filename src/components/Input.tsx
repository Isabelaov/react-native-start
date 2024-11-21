import React from 'react'
import { TextInput, TextInputProps } from "react-native";
import { FormStyles } from '../assets/styles/FormStyles';

type InputProps = TextInputProps & {
    placeholder: string;
}

export const Input: React.FC<InputProps> = ({placeholder, ...rest}) => {

  return (
    <TextInput
        style={FormStyles.input }
        placeholder={ placeholder }
        placeholderTextColor='#6d6d6d'
        {...rest}
    />
  )

}