import {Slider} from '@miblanchard/react-native-slider';
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
import {Bold} from '../../components/Typography/Text';
import useCars, {IFakeCar} from '../../hooks/useCars';
import useCarsStore from '../../hooks/useCarsStore';
import useDebounce from '../../hooks/useDebounce';
import filterCars from '../../utils/list/filterCars';
import filterCarsByPrice from '../../utils/list/filterCarsByPrice';
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
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  filterResultsContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  filterByPriceView: {
    marginTop: 10,
    textAlign: 'left',
  },
});
const SimpleSearch = () => {
  const {addCarsToStore} = useCarsStore();
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [maybeCars, setMaybeCars] = useState<IFakeCar[] | null>(null);
  const [cars] = useCars();
  const [showFilterByPrice, setShowFilterByPrice] = useState<boolean>(false);
  const [filterByPrice, setFilterByPrice] = useState<number | number[]>();
  const handleOnSearchCars = useDebounce(
    (text: string, filterFunction: Function = filterCars) => {
      //start filtering at any given word and when cars available
      if (cars?.length && text.length >= 3) {
        const matchingCars = filterFunction(text, cars);
        setMaybeCars(matchingCars);
        matchingCars && addCarsToStore(matchingCars);
        if (matchingCars?.length) {
          setRecentSearches([...new Set([...recentSearches, text])]);
        }
      } else if (!text) {
        setMaybeCars(null);
      }
    },
    500,
  );
  const handleOnFilterCars = (value: number | number[]) => {
    const priceText = value.toString();
    handleOnSearchCars(priceText, filterCarsByPrice);
  };
  return (
    <SafeAreaView style={carStyles.container}>
      <TouchableOpacity>
        <View style={carStyles.flexRow}>
          <TextInput
            style={simpleSearchStyles.input}
            onChangeText={handleOnSearchCars}
            placeholder="Search cars by make, model, color, year, or price"
          />
          <Button
            title="Filter"
            onPress={() => setShowFilterByPrice(!showFilterByPrice)}
          />
        </View>
        <View style={carStyles.filterResultsContainer}>
          {(showFilterByPrice && (
            <View style={carStyles.filterByPriceView}>
              <Text>Price: ${filterByPrice} / day</Text>
              <Slider
                value={filterByPrice}
                animateTransitions
                maximumTrackTintColor="#d3d3d3"
                maximumValue={5000}
                minimumTrackTintColor="#1fb28a"
                minimumValue={100}
                step={2}
                thumbTintColor="#1a9274"
                onValueChange={value => {
                  setFilterByPrice(value);
                  handleOnFilterCars(value);
                }}
              />
            </View>
          )) ||
            null}
          <RecentSearches
            data={recentSearches}
            handleOnSearchCars={handleOnSearchCars}
          />
          {(maybeCars !== null && (
            <View style={simpleSearchStyles.resultsFoundView}>
              {maybeCars?.length ? (
                <Text>
                  Found <Bold>{maybeCars.length}</Bold> car(s):
                </Text>
              ) : (
                <Text>
                  Found <Bold>0</Bold> cars based on your search filter criteria
                </Text>
              )}
            </View>
          )) ||
            null}
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
  resultsFoundView: {
    marginBottom: 10,
  },
  input: {
    width: '85%',
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
