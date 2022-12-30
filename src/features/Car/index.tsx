import React from 'react';
import {
  GestureResponderEvent,
  Text,
  Button,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import {ICar} from '../../hooks/useCars';

export interface ICarProps<DataType> {
  data: DataType;
  onPress: (event: GestureResponderEvent) => void;
}
export interface ICarPhotoProps {
  uri: string;
  styles: {
    container: {
      paddingTop?: number;
      width?: number;
      height?: number;
    };
    photo: {
      width: number;
      height: number;
    };
  };
}
const carStyles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  photo: {
    width: 300,
    height: 200,
  },
});

const CarPhoto = ({uri, styles}: ICarPhotoProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.photo} source={{uri: uri}} />
    </View>
  );
};
const Car = ({data, onPress}: ICarProps<ICar>) => {
  const {make, model, year, price} = data;
  return (
    <TouchableOpacity onPress={onPress}>
      <CarPhoto
        uri={`https://picsum.photos/seed/picsum/${carStyles.photo.width}/${carStyles.photo.height}`}
        styles={carStyles}
      />
      <Text>
        {year} {make} {model}
      </Text>
      <Text>{price} / day</Text>
      <Button title="Book now" />
    </TouchableOpacity>
  );
};
export default Car;
