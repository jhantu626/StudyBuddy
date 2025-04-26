import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {transformer} from '../../../metro.config';

const FilterSelecter = ({options, selectedFilter, setSelectedFilter}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          style={[
            styles.card,
            selectedFilter.name === option.name && {
              borderColor: colors.authPrimary,
            },
          ]}
          key={index}
          onPress={() => setSelectedFilter(option)}>
          <Text
            style={[
              styles.titleText,
              selectedFilter.name === option.name && {
                color: colors.authPrimary,
              },
            ]}>
            {option.name}
          </Text>
          <AntDesign
            name="caretdown"
            size={11}
            color={
              selectedFilter.name === option.name
                ? colors.authPrimary
                : '#43484E'
            }
            style={[
              {marginTop: -3},
              selectedFilter.name === option.name && {
                transform: [
                  {
                    rotate:
                      selectedFilter.name === option.name ? '180deg' : '0deg',
                  },
                ],
              },
            ]}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 7,
    height: 35,
    borderRadius: 30,
    borderWidth: 1.1,
    borderColor: colors.border,
    paddingHorizontal: 15,
  },
  titleText: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: '#000000',
  },
});

export default FilterSelecter;
