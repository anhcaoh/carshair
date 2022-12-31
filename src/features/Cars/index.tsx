import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import {FlatList, ListRenderItem, Text} from 'react-native';
import {RootStackParamList} from '../../../App';
import useCars, {ICar} from '../../hooks/useCars';
import Car from '../Car';

interface ICarsProps {}
type RenderItemProps<ItemType> = {
  item: ItemType;
};
export type CarsScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'Cars'
>;
const Cars = (_props: ICarsProps) => {
  const navigation = useNavigation<CarsScreenProps>();
  const [cars, loading, error] = useCars();
  const _cars = useMemo(() => {
    return cars.map(
      ({id, car_vin, car, car_model, car_color, car_model_year, price}) => {
        return {
          id,
          vin: car_vin,
          make: car,
          model: car_model,
          color: car_color,
          year: car_model_year,
          price,
        };
      },
    );
  }, [cars]);
  loading && <Text>Loading...</Text>;
  error && <Text>Something went wrong!</Text>;
  const handleItemOnPress = (item: any) => {
    console.log('ITEM PRESSED', item);
    const {id, vin} = item;
    navigation.navigate('CarDetails', {id, vin});
  };
  const renderItem: ListRenderItem<ICar> = ({item}: RenderItemProps<ICar>) => {
    return <Car data={item} onPress={() => handleItemOnPress(item)} />;
  };
  return <FlatList data={_cars} renderItem={renderItem} />;
};

export default Cars;
