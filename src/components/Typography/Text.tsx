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
    fontSize: 32,
    marginBottom: 10,
  },
  h2: {
    fontSize: 28,
    marginBottom: 10,
  },
  h3: {
    fontSize: 26,
    marginBottom: 10,
  },
});
interface ITextBase {
  children?: React.ReactNode | string;
  style?: object;
}
const Text = (props: ITextBase) => {
  return <_Text {...props} />;
};
const Bold = (props: ITextBase) => {
  return <_Text {...props} style={{...props.style, ...textStyles.bold}} />;
};
const Italic = (props: ITextBase) => {
  return <_Text {...props} style={{...props.style, ...textStyles.italic}} />;
};

const H1 = (props: ITextBase) => {
  return <_Text {...props} style={{...props.style, ...textStyles.h1}} />;
};
const H2 = (props: ITextBase) => {
  return <_Text {...props} style={{...props.style, ...textStyles.h2}} />;
};
const H3 = (props: ITextBase) => {
  return <_Text {...props} style={{...props.style, ...textStyles.h3}} />;
};
export {Bold, Italic, H1, H2, H3};
export default Text;
