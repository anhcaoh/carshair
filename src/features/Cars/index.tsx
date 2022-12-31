import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import {
  FlatList,
  ListRenderItem,
  Text,
  GestureResponderEvent,
} from 'react-native';
import {RootStackParamList} from '../../../App';
import useCars, {ICar} from '../../hooks/useCars';
import Car from '../Car';

interface ICarsProps {}
type RenderItemProps<ItemType> = {
  item: ItemType;
};
type CarsScreenProp = NativeStackNavigationProp<RootStackParamList, 'Cars'>;
const Cars = (_props: ICarsProps) => {
  const navigation = useNavigation<CarsScreenProp>();
  const [cars, loading, error] = useCars();
  const _cars = useMemo(() => {
    return cars.map(({car, car_model, car_color, car_model_year, price}) => {
      return {
        make: car,
        model: car_model,
        color: car_color,
        year: car_model_year,
        price,
      };
    });
  }, [cars]);
  loading && <Text>Loading...</Text>;
  error && <Text>Something went wrong!</Text>;
  const handleItemOnPress = (_event: GestureResponderEvent) => {
    console.log('ITEM PRESSED');
    navigation.navigate('CarDetails', {id: Math.floor(Math.random() * 100)});
  };
  const renderItem: ListRenderItem<ICar> = ({item}: RenderItemProps<ICar>) => {
    return <Car data={item} onPress={handleItemOnPress} />;
  };
  return <FlatList data={_cars} renderItem={renderItem} />;
};

export default Cars;
