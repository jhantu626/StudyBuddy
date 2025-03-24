import {Animated, Easing, Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const scaleAnimation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(scaleAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('Onboarding'));
    }, 2000);
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./../../../assets/Images/SplashIcon.webp')}
        style={[styles.image, {transform: [{scale: scaleAnimation}]}]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 60,
  },
});

export default SplashScreen;
