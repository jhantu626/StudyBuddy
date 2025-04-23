import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts} from '../../utils/fonts';
import DropdownInput from '../Inputs/DropdownInput';

const AddNotes = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleLabel}>AddNotes</Text>
      <View style={styles.formContainer}>
        <DropdownInput labelText={'Select Class'}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  titleLabel: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: '#6812D6',
  },
  formContainer: {
    width: '100%',
    marginTop: 10,
  },
});

export default AddNotes;
