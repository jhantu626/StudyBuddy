import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { fonts } from '../../utils/fonts';

const HorizontalSelector = ({values, selectedValue, setSelectedValue}) => {
  const changeSelectedValue = item => setSelectedValue(item);

  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={styles.scrollContainer}
      showsHorizontalScrollIndicator={false}>
      {values.map((item, index) => (
        <TouchableOpacity
          key={index + 'classes'}
          style={[
            styles.itemStyle,
            selectedValue === item && {
              backgroundColor: '#ffffff',
            },
          ]}
          onPress={() => changeSelectedValue(item)}>
          <Text
            style={[
              styles.textStyle,
              selectedValue === item && {
                color: '#000000',
              },
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    marginTop: 10,
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemStyle: {
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff20',
    borderRadius: 5,
  },
  textStyle: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: '#fff',
    elevation: 5,
  },
});

export default HorizontalSelector;
