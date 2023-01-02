import React, {useState} from 'react';
import {
  GestureResponderEvent,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  View,
} from 'react-native';
import useCars, {IFakeCar} from '../../hooks/useCars';
import useCarsStore from '../../hooks/useCarsStore';
import useDebounce from '../../hooks/useDebounce';
import filterCars from '../../utils/list/filterCars';
import RecentSearches from './RecentSearches';
import SearchResults from './SearchResults';

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
  container: {
    padding: 10,
    paddingTop: 0,
    backgroundColor: '#f1f1f1',
  },
  filterResultsContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});
const SimpleSearch = () => {
  const {addCarsToStore} = useCarsStore();
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [maybeCars, setMaybeCars] = useState<IFakeCar[] | null>(null);
  const [cars] = useCars();
  const handleOnSearchCars = useDebounce((text: string) => {
    //start filtering at any given word and when cars available
    if (cars?.length && text.length >= 3) {
      const matchingCars = filterCars(text, cars);
      setMaybeCars(matchingCars);
      matchingCars && addCarsToStore(matchingCars);
      if (matchingCars?.length) {
        setRecentSearches([...new Set([...recentSearches, text])]);
      }
    } else if (!text) {
      setMaybeCars(null);
    }
  }, 500);
  return (
    <SafeAreaView style={carStyles.container}>
      <TouchableOpacity>
        <TextInput
          style={simpleSearchStyles.input}
          onChangeText={handleOnSearchCars}
          placeholder="Search cars"
        />
        <View style={carStyles.filterResultsContainer}>
          <RecentSearches
            data={recentSearches}
            handleOnSearchCars={handleOnSearchCars}
          />
          <SearchResults data={maybeCars} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const simpleSearchStyles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    height: 40,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#fff',
    padding: 10,
  },
});
export default SimpleSearch;
