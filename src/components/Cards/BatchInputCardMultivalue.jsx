import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts} from '../../utils/fonts';

const BatchInputCardMultivalueMultivalue = ({
  lable = 'Batch Session',
  values = ['Physics', 'Chamestry', 'Math'],
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.lableText}>{lable}</Text>
      <View style={styles.contentCOntainer}>
        {values.map((item, index) => (
          <View key={index + item} style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>
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
  contentCOntainer: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap'
  },
  item: {
    backgroundColor: '#5A586D',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 3,
  },
  itemText: {
    fontSize: 10,
    fontFamily: fonts.medium,
    color: '#fff',
  },
});

export default BatchInputCardMultivalueMultivalue;
