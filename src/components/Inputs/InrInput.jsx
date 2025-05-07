import {Animated, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const InrInput = memo(
  ({
    value,
    setValue,
    labelText,
    isBg = false,
    minLength = 0,
    maxLength = 35,
    keyboardType = 'numbers-and-punctuation',
    bgColor = null,
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
      Animated.timing(labelAnim, {
        toValue: isFocused || value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, [isFocused, value]);

    const labelStyle = {
      position: 'absolute',
      left: 15,
      top: labelAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [15, -8], // From center to top
      }),
      fontSize: labelAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [13, 10], // Shrink the font size
      }),
      color: labelAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', colors.primary],
      }),
      fontFamily: fonts.medium,
      backgroundColor: isBg ? '#D6F6FA' : '#fff',
      paddingHorizontal: 4,
    };

    return (
      <View
        style={[
          styles.container,
          isBg && {
            backgroundColor: bgColor !== null ? bgColor + 20 : '#D6F6FA',
          },
          bgColor !== null && {borderColor: bgColor + 50},
        ]}>
        <Animated.Text style={labelStyle}>{labelText}</Animated.Text>
        <TextInput
          value={value}
          onChangeText={text => {
            if (text.length < minLength) {
            } else {
              setValue(text);
            }
          }}
          style={styles.inputText}
          selectionColor={colors.primary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={keyboardType}
          maxLength={maxLength}
        />
        <View style={styles.inrContainer}>
          <Text style={styles.inrText}>INR</Text>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 13,
    color: '#000',
    // marginTop: 10,
    // backgroundColor: 'red',
  },
  inrContainer: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: '#37474F',
    borderRadius: 3,
  },
  inrText: {
    fontSize: 10,
    fontFamily: fonts.medium,
    color: '#fff',
    letterSpacing: 1
  },
});

export default InrInput;
