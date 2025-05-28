import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MultiSelectDropdownInput = ({
  selectedValues = [],
  setSelectedValues,
  labelText,
  options = [],
  isBg = false,
  dropdownPosition = 'bottom', // Position control (top/bottom)
  maxDropdownHeight = 400, // Height control
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownAnim = useRef(new Animated.Value(0)).current;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    Animated.timing(dropdownAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const optionHeight = 44;
  const calculatedHeight = options.length * optionHeight;
  const dropdownHeight = dropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      0,
      Math.min(calculatedHeight, maxDropdownHeight, windowHeight * 0.5),
    ],
  });

  const dropdownOpacity = dropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // Calculate final top position for 'top' dropdown
  const finalTopPosition =
    -Math.min(calculatedHeight, maxDropdownHeight, windowHeight * 0.5) - 10;
  // Starting position (below the input field)
  const startTopPosition = 55; // Same as the bottom position offset

  // Animate top position based on dropdownPosition
  const dropdownTop = dropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange:
      dropdownPosition === 'top'
        ? [startTopPosition, finalTopPosition]
        : [55, 55],
  });

  const toggleSelect = option => {
    if (selectedValues.includes(option)) {
      setSelectedValues(selectedValues.filter(item => item !== option));
    } else {
      setSelectedValues([...selectedValues, option]);
    }
  };

  const removeFromSelected = option => {
    setSelectedValues(selectedValues.filter(item => item !== option));
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={[styles.container, isBg && {backgroundColor: '#D6F6FA'}]}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.8}>
        <View style={styles.inputContent}>
          {selectedValues.length > 0 ? (
            <View style={styles.valuesContainer}>
              {selectedValues.map((item, index) => (
                <View key={index+"multiselect-item"} style={styles.selectedTag}>
                  <Text style={styles.selectedText}>{item}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.placeHolder}>{labelText}</Text>
          )}

          <Icon
            name={isOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
            size={24}
            color={colors.primary}
          />
        </View>
      </TouchableOpacity>

      <Animated.View
        pointer
        pointerEvents="box-none"
        style={[
          styles.optionsContainer,
          isBg && {backgroundColor: '#D6F6FA'},
          {
            height: dropdownHeight,
            opacity: dropdownOpacity,
            top: dropdownTop, // Use animated top value
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
        ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          {options.map((option, index) => {
            const isSelected = selectedValues.includes(option);
            return (
              <View
                key={index}
                style={[
                  styles.optionItem,
                  isSelected && {backgroundColor: '#E0F7FA'},
                ]}>
                <TouchableOpacity
                  style={styles.optionTextWrapper}
                  onPress={() => toggleSelect(option)}>
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
                {isSelected && (
                  <TouchableOpacity
                    onPress={() => removeFromSelected(option)}
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                    <Icon name="close" size={18} color="#888" />
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'relative',
    width: '100%',
  },
  container: {
    width: '100%',
    minHeight: 50,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  valuesContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  selectedTag: {
    backgroundColor: '#E0F7FA',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  selectedText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: '#000',
  },
  // optionsContainer: {
  //   position: 'absolute',
  //   left: 0,
  //   right: 0,
  //   backgroundColor: '#fff',
  //   borderWidth: 1,
  //   borderColor: colors.primary,
  //   borderRadius: 10,
  //   zIndex: 100,
  //   overflow: 'hidden',
  // }
  optionsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    zIndex: 100,
    overflow: 'hidden',
    // Add these:
    elevation: 5, // for Android
    shadowColor: '#000', // for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionTextWrapper: {
    flex: 1,
  },
  optionText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: '#000',
  },
  placeHolder: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: '#00000050',
  },
});

export default MultiSelectDropdownInput;
