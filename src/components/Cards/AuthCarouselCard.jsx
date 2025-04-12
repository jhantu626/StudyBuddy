import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const AuthCarouselCard = ({image, title}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.bannerImage} resizeMode="cover" />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 10,
    gap: 15,
  },
  bannerImage: {
    width: 110,
    height: 75,
    borderRadius: 5,
  },
  text: {
    width: 190,
    fontSize: 10,
    fontFamily: fonts.medium,
    color: '#37474F',
  },
});

export default AuthCarouselCard;
