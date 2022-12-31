import React, {useMemo} from 'react';
import {
  GestureResponderEvent,
  Text,
  Button,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import useCar from '../../hooks/useCar';
import Car from '../Car';
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
const carStyles = StyleSheet.create({
  flexRow: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    marginBottom: 10,
    padding: 10,
    paddingTop: 0,
    backgroundColor: '#e1e1e1',
  },
  text: {
    fontSize: 24,
  },
  photoView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  yearMakeModelView: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  priceView: {
    width: '60%',
    height: '100%',
    paddingBottom: 20,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'green',
  },
  learnMoreView: {
    width: '40%',
  },
  bookNowView: {
    padding: 10,
    backgroundColor: '#000',
  },
  button: {
    color: '#fff', //'#007AFF',
  },
  photo: {
    width: 400,
    height: 200,
    resizeMode: 'contain',
  },
});

const CarPhoto = ({uri, styles}: ICarPhotoProps) => {
  return <Image style={styles} source={{uri: uri}} />;
};
type CarDetailsProps = NativeStackScreenProps<RootStackParamList, 'CarDetails'>;
const CarDetails = (_props: CarDetailsProps) => {
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
        onPress={() => {}}
      />
    </React.Fragment>
  );
};
export default CarDetails;
