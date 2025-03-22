import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';

const Onboarding = () => {
  const widthAnimation = useRef(new Animated.Value(0)).current;

  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    Animated.timing(widthAnimation, {
      toValue: 1,
      duration: 0,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(widthAnimation, {
        toValue: 3,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    });
  }, [pageNumber]);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.headerContainer}>
          <Image
            style={styles.bannerImage}
            source={require('./../../../../assets/Images/onboarding1.webp')}
            resizeMode="contain"
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.titleText}>Practice Anything, Anywhere</Text>
            <Text style={styles.descText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit semper
              nulla nunc bibendum.
            </Text>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.subFooterContaier}>
            <View style={styles.dotContainer}>
              <Animated.View
                style={[
                  styles.dot,
                  pageNumber === 0 && {
                    transform: [{scaleX: widthAnimation}],
                    backgroundColor: colors.primary,
                    borderRadius: 1,
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.dot,
                  pageNumber === 1 && {
                    transform: [{scaleX: widthAnimation}],
                    backgroundColor: colors.primary,
                    borderRadius: 1,
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.dot,
                  pageNumber === 2 && {
                    transform: [{scaleX: widthAnimation}],
                    backgroundColor: colors.primary,
                    borderRadius: 1,
                  },
                ]}
              />
            </View>
            <TouchableOpacity
              style={styles.nextBtn}
              onPress={() => setPageNumber(prev => prev + 1)}>
              <Text style={styles.btnText}>
                {pageNumber === 2 ? 'Get Started' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    width: '100%',
    height: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
  },
  bannerImage: {
    width: 315,
    height: 315,
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontFamily: fonts.semiBold,
    width: 300,
    textAlign: 'center',
    marginVertical: 10,
    color: colors.text,
  },
  descText: {
    width: 330,
    textAlign: 'center',
    fontSize: 13,
    fontFamily: fonts.regular,
    marginTop: 5,
    color: colors.textSecondary,
  },
  footerContainer: {
    width: '100%',
    height: 45,
    alignItems: 'flex-end',
  },
  subFooterContaier: {
    width: '60%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dotContainer: {
    width: 35,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: colors.secondary,
    borderRadius: 5 / 2,
  },
  nextBtn: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    gap: 10,
  },
  btnText: {
    fontSize: 12,
    color: '#ffffff',
    fontFamily: fonts.semiBold,
  },
});

export default Onboarding;
