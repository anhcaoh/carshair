import React from 'react';
import {useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import useCar from '../../hooks/useCar';
import Car from '../Car';
import {Text, View} from 'react-native';
import {Bold, H2, H3, Italic} from '../../components/Typography/Text';
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
        <H3>Car Details:</H3>
        <Text>
          VIN: <Bold>{vin}</Bold>
        </Text>
        <Text>
          Make: <Bold>{make}</Bold>
        </Text>
        <Text>
          Model: <Bold>{model}</Bold>
        </Text>
        <Text>
          Year: <Bold>{year}</Bold>
        </Text>
        <Text>
          Color: <Bold>{color}</Bold>
        </Text>
        <Text />
        <Text>
          Daily Rental: <Bold>{price}</Bold>
        </Text>
        <Text>
          Accepted: <Italic>Visa / Mastercard / Discover</Italic>
        </Text>
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
