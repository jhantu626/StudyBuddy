import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts} from '../../utils/fonts';

const BatchInputCard = ({lable = 'Batch Session', value = '2025 - 2026'}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.lableText}>{lable}</Text>
      <Text style={styles.vauleText}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    backgroundColor: '#F5F5F5',
    borderWidth: 0.5,
    borderColor: '#D2D3D4',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  lableText: {
    fontSize: 8,
    fontFamily: fonts.regular,
    color: '#414042',
  },
  vauleText: {
    fontSize: 11,
    fontFamily: fonts.medium,
    color: '#000',
  },
});

export default BatchInputCard;
