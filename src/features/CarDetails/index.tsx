import React from 'react';
import {useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import useCar from '../../hooks/useCar';
import Car from '../Car';
import {Text, View} from 'react-native';
export interface ICarDetailsProps {
  id: string;
}
export interface ICarPhotoProps {
  uri: string;
  styles: {
    width: number;
    height: number;
  };
}
type CarDetailsProps = NativeStackScreenProps<RootStackParamList, 'CarDetails'>;
const CarDetails = () => {
  const {
    params: {id, vin},
  } = useRoute<CarDetailsProps['route']>();
  const {
    car: make,
    car_model: model,
    car_model_year: year,
    car_color: color,
    price,
  } = useCar({id, vin});
  const Details = () => {
    return (
      <View>
        <Text>Car Details:</Text>
        <Text>VIN: {vin}</Text>
        <Text>Make: {make}</Text>
        <Text>Model: {model}</Text>
        <Text>Year: {year}</Text>
        <Text>Color: {color}</Text>
        <Text />
        <Text>Daily Rental: {price}</Text>
        <Text>Accepted: Visa / Mastercard</Text>
      </View>
    );
  };
  return (
    <React.Fragment>
      <Car
        data={{
          id,
          vin,
          make,
          model,
          color,
          year,
          price,
        }}
        showLearnMore={false}
        Component={Details}
        onPress={() => {}}
      />
    </React.Fragment>
  );
};
export default CarDetails;
