import React from 'react';
import {StyleSheet, Text as _Text} from 'react-native';
export interface ITextProps {
  as: 'text' | 'bold' | 'italic' | 'h1' | 'h2';
}
const textStyles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  h1: {
    fontSize: 40,
  },
  h2: {
    fontSize: 32,
  },
});

const Text = () => {
  return <_Text />;
};
const Bold = () => {
  return <_Text style={textStyles.bold} />;
};
const Italic = () => {
  return <_Text style={textStyles.italic} />;
};

const H1 = () => {
  return <_Text style={textStyles.h1} />;
};
const H2 = () => {
  return <_Text style={textStyles.h2} />;
};
export {Bold, Italic, H1, H2};
export default Text;
