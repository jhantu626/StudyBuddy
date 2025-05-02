import { Animated, StyleSheet, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DropdownInput = ({
  value,
  setValue,
  labelText,
  options = [],
  isBg = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;
  const dropdownAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  useEffect(() => {
    if (isOpen) {
      Animated.timing(dropdownAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(dropdownAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isOpen]);

  const labelStyle = {
    position: 'absolute',
    left: 15,
    top: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [15, -8],
    }),
    fontSize: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [13, 10],
    }),
    color: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', colors.primary],
    }),
    fontFamily: fonts.medium,
    backgroundColor: isBg ? '#D6F6FA' : '#fff',
    paddingHorizontal: 4,
    zIndex: 10,
  };

  // CHANGED: Simplified height calculation and added max height for scrollable dropdown
  const optionHeight = 44; // Fixed height for each option
  const maxDropdownHeight = 400; // Added: Maximum height for the dropdown
  const calculatedHeight = options.length * optionHeight; // Added: Calculate total height
  const dropdownHeight = dropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.min(calculatedHeight, maxDropdownHeight)], // CHANGED: Cap height at maxDropdownHeight
    // ORIGINAL: outputRange: [0, options.length > 0 ? (options.length - 1) * optionHeight + lastOptionHeight : 0],
  });

  const dropdownOpacity = dropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const handleSelect = option => {
    setValue(option);
    setIsOpen(false);
    setIsFocused(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={[styles.container, isBg && { backgroundColor: '#D6F6FA' }]}
        onPress={() => {
          setIsOpen(!isOpen);
          setIsFocused(true);
        }}
        activeOpacity={0.8}>
        <Animated.Text style={labelStyle}>{labelText}</Animated.Text>
        <View style={styles.inputContent}>
          <Text style={styles.selectedText}>{value || ''}</Text>
          <Icon
            name={isOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
            size={24}
            color={colors.primary}
          />
        </View>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.optionsContainer,
          isBg && { backgroundColor: '#D6F6FA' },
          {
            height: dropdownHeight,
            opacity: dropdownOpacity,
            // ADDED: Shadow properties for iOS and Android
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
        ]}>
        {/* ADDED: ScrollView to make options scrollable */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 0 }}
        >
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionItem,
                value === option && { backgroundColor: '#D6F6FA' },
                index === 0 && {
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                },
                index === options.length - 1 && {
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  borderBottomWidth: 0,
                },
              ]}
              onPress={() => handleSelect(option)}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
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
    height: 50,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: '#000',
    flex: 1,
  },
  optionsContainer: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    zIndex: 100,
    // ORIGINAL: elevation: 5, // Moved to Animated.View style
    overflow: 'hidden',
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    height: 44, // Fixed height for all options
  },
  optionText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: '#000',
  },
});

export default DropdownInput;