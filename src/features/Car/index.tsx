import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {
  GestureResponderEvent,
  Text,
  Button,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {ICar} from '../../hooks/useCars';
import {CarsScreenProps} from '../Cars';

export interface ICarProps<DataType> {
  data: DataType;
  styles?: object;
  showLearnMore?: boolean;
  Component?: React.PureComponent | any;
  onPress: (event: GestureResponderEvent) => void;
}
export interface ICarPhotoProps {
  uri: string;
  styles: {
    width: number;
    height: number;
  };
}
const carStyles = StyleSheet.create({
  callToAction: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    marginBottom: 10,
    padding: 10,
    paddingTop: 0,
    backgroundColor: '#f1f1f1',
  },
  text: {
    fontSize: 24,
  },
  photoView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsComponent: {
    padding: 10,
    fontSize: 24,
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
  priceViewWithCTA: {
    width: '60%',
    height: '100%',
  },
  priceView: {
    // width: '60%',
    // height: '100%',
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
    marginTop: 20,
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
const Car = ({data, showLearnMore, Component, onPress}: ICarProps<ICar>) => {
  const navigation = useNavigation<CarsScreenProps>();
  const _key = useMemo(() => Math.floor(Math.random() * 100), []);
  const {id, vin, make, model, year, price} = data;
  return (
    <View style={carStyles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={carStyles.photoView}>
          <CarPhoto
            uri={`https://picsum.photos/${carStyles.photo.width}/${carStyles.photo.height}?ramdon=${_key}`}
            styles={carStyles.photo}
          />
        </View>
        <View style={carStyles.details}>
          <View>
            <View style={carStyles.yearMakeModelView}>
              <Text>VIN: {vin}</Text>
              <Text style={carStyles.text}>
                {year} {make} {model}
              </Text>
            </View>
            <View style={carStyles.callToAction}>
              <View
                style={
                  showLearnMore === false
                    ? carStyles.priceView
                    : carStyles.priceViewWithCTA
                }>
                <Text>
                  <Text style={carStyles.price}>{price}</Text>
                  <Text style={carStyles.text}> / day</Text>
                </Text>
              </View>
              {showLearnMore === false ? null : (
                <View style={carStyles.learnMoreView}>
                  <Button
                    title="LEARN MORE"
                    onPress={() => {
                      navigation.navigate('CarDetails', {
                        id,
                        vin,
                      });
                    }}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
        {Component && (
          <View style={carStyles.detailsComponent}>
            <Component />
          </View>
        )}
        <View style={carStyles.bookNowView}>
          <Button
            onPress={() => Alert.alert('BOOK NOW', vin)}
            color={carStyles.button.color}
            title="BOOK NOW"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Car;
