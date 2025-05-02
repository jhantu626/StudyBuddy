import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fonts} from '../../utils/fonts';
import HorizontalSelector from '../Selectors/HorizontalSelector';

const MainHeader = ({
  title = '',
  isBackable = true,
  values = ['Class X', 'Class XI', 'Class XII', 'Class IX'],
  selectedValue,
  setSelectedValue,
  isSelectableValues = true,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          height: isSelectableValues ? 100 : 60,
        },
      ]}>
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.backBtn} disabled={!isBackable}>
          {isBackable && (
            <Ionicons name="arrow-back" size={20} color="#ffffff" />
          )}
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={{width: 10, height: 10}} />
      </View>
      {/* <ScrollView
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
      </ScrollView> */}
      {isSelectableValues && (
        <HorizontalSelector
          values={values}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: '#ffffff',
  },
});

export default MainHeader;
