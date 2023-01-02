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
import useDebounce from '../../hooks/useDebounce';
import filterCars from '../../utils/list/filterCars';
import RecentSearches from './RecentSearches';

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
  filterResultsContainer: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
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
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [maybeCars, setMaybeCars] = useState<IFakeCar[] | null>(null);
  const [cars] = useCars();
  const handleOnSearchCars = useDebounce((text: string) => {
    //start filtering at any given word and when cars available
    if (cars?.length && text.length >= 3) {
      const matchingCars = filterCars(text, cars);
      setMaybeCars(matchingCars);
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
          style={styles.input}
          onChangeText={handleOnSearchCars}
          placeholder="Search cars"
        />
        <View style={carStyles.filterResultsContainer}>
          <RecentSearches
            data={recentSearches}
            handleOnSearchCars={handleOnSearchCars}
          />
          {maybeCars && <Text>Found {maybeCars.length} cars:</Text>}
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
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
