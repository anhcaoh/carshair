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
    params: {id},
  } = useRoute<CarDetailsProps['route']>();
  console.log(id);
  const _key = useMemo(() => Math.floor(Math.random() * 100), []);
  return (
    <View style={carStyles.container}>
      <TouchableOpacity>
        <View style={carStyles.photoView}>
          <CarPhoto
            uri={`https://picsum.photos/${carStyles.photo.width}/${carStyles.photo.height}?ramdon=${_key}`}
            styles={carStyles.photo}
          />
        </View>
        <View style={carStyles.details}>
          <View>
            <View style={carStyles.yearMakeModelView}>
              <Text style={carStyles.text}>{/* {year} {make} {model} */}</Text>
            </View>
            <View style={carStyles.flexRow}>
              <View style={carStyles.priceView}>
                <Text>
                  {/* <Text style={carStyles.price}>{price}</Text> */}
                  <Text style={carStyles.text}> / day</Text>
                </Text>
              </View>
              <View style={carStyles.learnMoreView}>
                <Button
                  title="LEARN MORE"
                  onPress={() => console.log('LEARN MORE PRESSED')}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={carStyles.bookNowView}>
          <Button
            onPress={() => console.log('BOOK NOW PRESSED')}
            color={carStyles.button.color}
            title="BOOK NOW"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default CarDetails;
