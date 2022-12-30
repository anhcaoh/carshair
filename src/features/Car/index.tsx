import React from 'react';
import {
  GestureResponderEvent,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import {ICar} from '../../hooks/useCars';

export interface ICarProps<DataType> {
  data: DataType;
  onPress: (event: GestureResponderEvent) => void;
}
const Car = ({data, onPress}: ICarProps<ICar>) => {
  const {make, model, year, price} = data;
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>
        {year} {make} {model}
      </Text>
      <Text>{price} / day</Text>
      <Button title="Book now" />
    </TouchableOpacity>
  );
};
export default Car;
