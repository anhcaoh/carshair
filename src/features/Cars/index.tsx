import React, {useMemo} from 'react';
import {
  FlatList,
  ListRenderItem,
  Text,
  GestureResponderEvent,
} from 'react-native';
import useCars, {ICar} from '../../hooks/useCars';
import Car from '../Car';

type RenderItemProps<ItemType> = {
  item: ItemType;
};
const Cars = () => {
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
  console.log(_cars);
  loading && <Text>Loading...</Text>;
  error && <Text>Something went wrong!</Text>;
  const handleItemOnPress = (event: GestureResponderEvent) => {
    console.log(event.currentTarget);
  };
  const renderItem: ListRenderItem<ICar> = ({item}: RenderItemProps<ICar>) => {
    return <Car data={item} onPress={handleItemOnPress} />;
  };
  return <FlatList data={_cars} renderItem={renderItem} />;
};

export default Cars;
