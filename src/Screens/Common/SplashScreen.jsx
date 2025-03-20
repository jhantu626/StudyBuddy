import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('Onboarding'));
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('./../../../assets/Images/SplashIcon.webp')}
        style={[styles.image]}
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
    width: 234,
    height: 60,
  },
});

export default SplashScreen;
