import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SubjectSelection = ({
  options = [],
  selectedItems,
  setSelectedItems,
  placeholder = 'Search...',
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filterData = useMemo(() => {
    return options.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, options]);

  const handleSelect = useCallback(
    item => {
      setSelectedItems(prev => {
        const isAlreadySelected = prev.some(
          selected => selected.id === item.id,
        );
        if (isAlreadySelected) {
          return prev.filter(selected => selected.id !== item.id);
        } else {
          return [...prev, item];
        }
      });
    },
    [setSelectedItems],
  );

  const isSelected = useCallback(
    item => {
      const isSelectedItem = selectedItems.some(
        selected => selected.id === item.id,
      );
      return isSelectedItem;
    },
    [selectedItems],
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons
          name="magnify"
          size={20}
          color={colors.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          style={styles.inputSearch}
          selectionColor={colors.primary}
          maxLength={50}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearIcon}>
            <MaterialCommunityIcons
              name="close-circle"
              size={17}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Options List */}
      <View style={styles.contentContainer}>
        {filterData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.contentItem,
              isSelected(item) && {
                backgroundColor: '#282356',
              },
            ]}
            onPress={() => handleSelect(item)}>
            <Image
              source={
                isSelected(item)
                  ? require('./../../../assets/Images/book_white.png')
                  : require('./../../../assets/Images/book.png')
              }
              style={styles.icon}
            />
            <Text
              style={[styles.subjectText, isSelected(item) && {color: '#fff'}]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  clearIcon: {
    marginLeft: 10,
  },
  inputSearch: {
    flex: 1,
    height: '100%',
    fontSize: 13,
    fontFamily: fonts.medium,
    color: colors.text,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentItem: {
    width: 100,
    height: 100,
    backgroundColor: '#2823561A',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7.5,
  },
  icon: {
    width: 40,
    height: 40,
  },
  subjectText: {
    fontSize: 13,
    fontFamily: fonts.medium,
    color: '#282356',
    width: 70,
    textAlign: 'center',
  },
});

export default SubjectSelection;
