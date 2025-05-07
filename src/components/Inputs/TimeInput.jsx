import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

const TimeInput = memo(
  ({value, setValue, labelText, isBg = false, bgColor = null}) => {
    const [isFocused, setIsFocused] = useState(false);
    const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
      Animated.timing(labelAnim, {
        toValue: isFocused || value ? 0.5 : 0,
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
      fontSize: 10,
      fontFamily: fonts.medium,
      backgroundColor: isBg ? '#D6F6FA' : '#fff',
      paddingHorizontal: 4,
    };

    return (
      <TouchableOpacity
        onPress={() => {
          setIsFocused(true);
          DateTimePickerAndroid.open({
            mode: 'time',
            value: new Date(value) || new Date(),
            is24Hour: false,
            onChange: (event, selectedTime) => {
              if (event.type === 'set' && selectedTime) {
                setValue(selectedTime.toLocaleTimeString());
                console.log('Yes', selectedTime.toLocaleTimeString());
              }
            },
          });
        }}
        style={[
          styles.container,
          isBg && {
            backgroundColor: bgColor !== null ? bgColor + 20 : '#D6F6FA',
          },
          bgColor !== null && {borderColor: bgColor + 50},
        ]}>
        <Animated.Text style={labelStyle}>{labelText}</Animated.Text>
        <Text style={styles.text}>{value}</Text>
      </TouchableOpacity>
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
    justifyContent: 'center',
  },
  text: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: '#000',
    marginTop: 10,
  },
});

export default TimeInput;
