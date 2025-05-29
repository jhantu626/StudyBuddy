import {StyleSheet, View} from 'react-native';
import React from 'react';

const YearMonth = ({year, month}) => {
  return (
    <View style={styles.yearMonthContainer}>
      <View style={styles.yearMonthBox}>{year}</View>
      <View style={styles.yearMonthBox}>{month}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  yearMonthContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  yearMonthBox: {
    width: '48%',
  },
});

export default YearMonth;
