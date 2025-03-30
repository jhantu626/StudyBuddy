import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AuthCarouselCard from '../Cards/AuthCarouselCard';

const carouserData = [
  {
    title:
      'How To Increase Mock Test Marks || How To Analyze Your Mock Test Performance',
    image: require('./../../../assets/Images/banner.webp'),
  },
  {
    title:
      'How To Increase Mock Test Marks || How To Analyze Your Mock Test Performance',
    image: require('./../../../assets/Images/banner.webp'),
  },
  {
    title:
      'How To Increase Mock Test Marks || How To Analyze Your Mock Test Performance',
    image: require('./../../../assets/Images/banner.webp'),
  },
];

const AuthCarousel = () => {
  const {width: screenWidth} = Dimensions.get('screen');
  const [pageNumber, setPageNumber] = useState(0);
  return (
    <View style={styles.container}>
      <FlatList
        data={carouserData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item, index) => {
          return (
            <View key={index} style={{width: screenWidth}}>
              <AuthCarouselCard
                title={item.item.title}
                image={item.item.image}
              />
            </View>
          );
        }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={event => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const newPage = Math.round(offsetX / screenWidth);
          setPageNumber(newPage);
        }}
        scrollEventThrottle={16}
      />
      <View style={styles.dotContainer}>
        {[0, 1, 2].map((item, index) => (
          <View
          key={index}
            style={[
              styles.dot,
              index === pageNumber && {
                backgroundColor: '#000',
                borderRadius: 7 / 2,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
    gap: 10,
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: '#C7C7C7',
    borderRadius: 6 / 2,
  },
});

export default AuthCarousel;
