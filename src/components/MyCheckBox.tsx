import React, { useState } from 'react';
import { Text, View } from 'react-native';
import CheckBox, { CheckBoxProps } from '@react-native-community/checkbox';
import { CheckBoxStyles, Texts, tintColors } from '../assets/styles';

type MyCheckBoxProps = CheckBoxProps & {
  option: any;
  selectedOption: any | null;
  setSelectedOption: (value: any | null) => void;
};

export const MyCheckBox = ({
  option,
  selectedOption,
  setSelectedOption,
  ...rest
}: MyCheckBoxProps) => {
  const handleCheckboxChange = (index: any) => {
    setSelectedOption((prev: any) => (prev === index ? null : index));
  };

  return (
    <View style={CheckBoxStyles.checkboxContainer}>
      <CheckBox
        value={selectedOption === option}
        onValueChange={() => handleCheckboxChange(option)}
        tintColors={tintColors}
        {...rest}
      />
      <Text style={Texts.text}>{option}</Text>
    </View>
  );
};
