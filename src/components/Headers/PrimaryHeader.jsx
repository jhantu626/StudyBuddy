import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import {StackActions, useNavigation} from '@react-navigation/native';

const PrimaryHeader = ({
  title = 'Create Account',
  isBtn = false,
  btnText = 'Skip',
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => {
          if(navigation.canGoBack()){
            navigation.goBack();
          }
        }}>
        <Ionicons name="arrow-back" color="#fff" size={20} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity>{isBtn && <Text>{btnText}</Text>}</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.background,
  },
});

export default PrimaryHeader;
