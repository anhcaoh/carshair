import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import Text from '../../components/Typography/Text';
export interface IRecentSearches {
  data: string[];
  handleOnSearchCars: Function;
}
const recentSearchesStyles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'scroll',
  },
});
const RecentSearches = ({data, handleOnSearchCars}: IRecentSearches) => {
  return (
    (data?.length && (
      <View>
        <Text>Recent Searches:</Text>
        <View style={recentSearchesStyles.flexRow}>
          {data?.map(text => (
            <Button
              key={text}
              title={text}
              onPress={() => handleOnSearchCars(text)}
            />
          ))}
        </View>
      </View>
    )) ||
    null
  );
};
export default RecentSearches;
