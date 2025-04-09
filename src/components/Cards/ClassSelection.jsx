import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ClassSelection = ({
  options = [
    {id: 1, name: 'Nursery'},
    {id: 2, name: 'LKG'},
    {id: 3, name: 'UKG'},
    {id: 4, name: 'Class 1'},
    {id: 5, name: 'Class 2'},
    {id: 6, name: 'Class 3'},
    {id: 7, name: 'Class 4'},
    {id: 8, name: 'Class 5'},
    {id: 9, name: 'Class 6'},
    {id: 10, name: 'Class 7'},
    {id: 11, name: 'Class 8'},
    {id: 12, name: 'Class 9'},
    {id: 13, name: 'Class 10'},
    {id: 14, name: 'Class 11'},
    {id: 15, name: 'Class 12'},
  ],
  selectedItems,
  setSelectedItems,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOptions = options.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleSelection = item => {
    setSelectedItems(prev => {
      const isSelected = prev.some(selected => selected.id === item.id);
      if (isSelected) {
        return prev.filter(selected => selected.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const isSelected = item => {
    return selectedItems.some(selected => selected.id === item.id);
  };

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
          placeholder="Search classes..."
          placeholderTextColor={colors.textSecondary}
          style={styles.inputSearch}
          selectionColor={colors.primary}
          maxLength={50}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearIcon}>
            <MaterialCommunityIcons
              name="close-circle"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Options List */}
      <View style={styles.optionsContainer}>
        {filteredOptions.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[styles.optionItem, isSelected(item) && styles.selectedItem]}
            onPress={() => toggleSelection(item)}>
            <MaterialCommunityIcons
              name="google-classroom"
              size={24}
              color={isSelected(item) ? colors.primary : colors.text}
            />
            <Text
              style={[
                styles.optionText,
                isSelected(item) && styles.selectedText,
              ]}>
              {item.name}
            </Text>
            {isSelected(item) && (
              <MaterialCommunityIcons
                name="check-circle"
                size={20}
                color={colors.primary}
                style={styles.checkIcon}
              />
            )}
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
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.text,
  },
  selectedPreview: {
    backgroundColor: colors.primaryLight,
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedPreviewText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.primaryDark,
  },
  optionsContainer: {
    flex: 1,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedItem: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  optionText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  selectedText: {
    color: colors.primary,
    fontFamily: fonts.semiBold,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
});

export default ClassSelection;
