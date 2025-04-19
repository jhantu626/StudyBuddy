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

const MainHeader = ({
  title = '',
  isBackable = true,
  values = ['Class X', 'Class XI', 'Class XII', 'Class IX'],
  selectedValue,
  setSelectedValue,
}) => {
  const changeSelectedValue = item => setSelectedValue(item);
  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.backBtn} disabled={!isBackable}>
          {isBackable && (
            <Ionicons name="arrow-back" size={20} color="#ffffff" />
          )}
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={{width: 10, height: 10}} />
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
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
  scrollContainer: {
    flexDirection: 'row',
    flexGrow:1,
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
    elevation: 5
  },
});

export default MainHeader;
