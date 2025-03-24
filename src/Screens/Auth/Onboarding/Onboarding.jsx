import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  Easing,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';
import {StackActions, useNavigation} from '@react-navigation/native';

const {width: screenWidth} = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    image: require('./../../../../assets/Images/onboarding1.webp'),
    title: 'Practice Anything, Anywhere',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit semper nulla nunc bibendum.',
  },
  {
    id: '2',
    image: require('./../../../../assets/Images/onboarding2.webp'),
    title: 'Learn at Your Own Pace',
    description:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: '3',
    image: require('./../../../../assets/Images/onboarding3.webp'),
    title: 'Master Your Skills',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
];

const DOT_WIDTH = 5;
const ACTIVE_DOT_WIDTH = 15;
const DOT_SPACING = 5;

const Onboarding = () => {
  const navigation = useNavigation();
  const dotAnimations = useRef(
    onboardingData.map(() => new Animated.Value(DOT_WIDTH)),
  ).current;
  const flatListRef = useRef(null);
  const [pageNumber, setPageNumber] = useState(0);

  // Animate dots when page changes
  useEffect(() => {
    dotAnimations.forEach((dot, index) => {
      Animated.timing(dot, {
        toValue: index === pageNumber ? ACTIVE_DOT_WIDTH : DOT_WIDTH,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();
    });
  }, [pageNumber]);

  const handlePageNumber = () => {
    if (pageNumber < onboardingData.length - 1) {
      const nextPage = pageNumber + 1;
      setPageNumber(nextPage);
      flatListRef.current?.scrollToIndex({index: nextPage, animated: true});
    } else {
      navigation.dispatch(StackActions.replace('Login'));
    }
  };

  const handleScrollEnd = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newPage = Math.round(contentOffsetX / screenWidth);
    if (newPage !== pageNumber) {
      setPageNumber(newPage);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.slide}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.bannerImage}
          source={item.image}
          resizeMode="contain"
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.titleText} numberOfLines={2} ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text style={styles.descText}>{item.description}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScrollEnd}
          scrollEventThrottle={16}
          keyExtractor={item => item.id}
          getItemLayout={(data, index) => ({
            length: screenWidth,
            offset: screenWidth * index,
            index,
          })}
        />

        <View style={styles.footerContainer}>
          <View style={styles.subFooterContaier}>
            <View style={styles.dotContainer}>
              {onboardingData.map((_, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.dot,
                    {
                      width: dotAnimations[index],
                      backgroundColor:
                        index === pageNumber
                          ? colors.primary
                          : colors.secondary,
                    },
                  ]}
                />
              ))}
            </View>
            <TouchableOpacity style={styles.nextBtn} onPress={handlePageNumber}>
              <Text style={styles.btnText}>
                {pageNumber === onboardingData.length - 1
                  ? 'Get Started'
                  : 'Next'}
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
  slide: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
  },
  bannerImage: {
    width: 300,
    height: 300,
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontFamily: fonts.semiBold,
    // width: 250,
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
    gap: 5,
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
