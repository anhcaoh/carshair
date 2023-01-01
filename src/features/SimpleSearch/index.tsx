import React, {useMemo} from 'react';
import {
  GestureResponderEvent,
  Text,
  Button,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {ICar} from '../../hooks/useCars';
import useDebounce from '../../hooks/useDebounce';
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
const SimpleSearch = () => {
  const handleInputOnChange = useDebounce((text: string) => {
    console.log(text);
  }, 500);
  return (
    <SafeAreaView style={carStyles.container}>
      <TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={handleInputOnChange}
          placeholder="Search cars"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
  },
});
export default SimpleSearch;
