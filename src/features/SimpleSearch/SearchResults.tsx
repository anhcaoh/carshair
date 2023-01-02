import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../../components/Typography/Text';
import {IFakeCar} from '../../hooks/useCars';
export interface ISearchResults {
  data: IFakeCar[] | null;
}
const searchResultsStyles = StyleSheet.create({
  flexRow: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'scroll',
  },
});
const SearchResults = ({data}: ISearchResults) => {
  return (
    (data?.length && (
      <View style={searchResultsStyles.flexRow}>
        {<Text>Found {data.length} cars:</Text>}
      </View>
    )) ||
    null
  );
};
export default SearchResults;
