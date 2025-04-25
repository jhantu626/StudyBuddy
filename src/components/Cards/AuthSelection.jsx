import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useMemo, useCallback} from 'react';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AuthSelection = ({
  options = [],
  selectedItems,
  setSelectedItems,
  iconName,
  placeholder = 'Search...',
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOptions = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return options.filter(item => item.name.toLowerCase().includes(query));
  }, [searchQuery, options]);

  const toggleSelection = useCallback(
    item => {
      setSelectedItems(prev => {
        const isSelected = prev.some(selected => selected.id === item.id);
        return isSelected
          ? prev.filter(selected => selected.id !== item.id)
          : [...prev, item];
      });
    },
    [setSelectedItems],
  );

  const isSelected = useCallback(
    item => selectedItems.some(selected => selected.id === item.id),
    [selectedItems],
  );

  const renderIcon = useCallback(
    item => {
      const color = isSelected(item) ? colors.primary : colors.text;
      switch (iconName) {
        case 'class':
          return (
            <MaterialCommunityIcons
              name="google-classroom"
              size={18}
              color={color}
            />
          );
        case 'language':
          return <MaterialIcons name="language" size={18} color={color} />;
        case 'board':
          return (
            <MaterialCommunityIcons
              name="apple-keyboard-command"
              size={18}
              color={color}
            />
          );
        default:
          return null;
      }
    },
    [iconName, isSelected],
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
      <View style={styles.optionsContainer}>
        {filteredOptions.map(item => {
          const selected = isSelected(item);
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.optionItem, selected && styles.selectedItem]}
              onPress={() => toggleSelection(item)}>
              {renderIcon(item)}
              <Text
                style={[styles.optionText, selected && styles.selectedText]}>
                {item.name}
              </Text>
              {selected && (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={16}
                  color={colors.primary}
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
          );
        })}
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
    // backgroundColor: colors.info,
    borderWidth: 1,
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
  optionsContainer: {
    flex: 1,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
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
    fontSize: 13,
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

export default AuthSelection;
