import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const OnboardingItem = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        style={styles.bannerImage}
        source={getImageSource()}
        resizeMode="contain"
      />
      <View style={styles.headerTextContainer}>
        <Text style={styles.titleText} numberOfLines={2}>
          {onboardingData[pageNumber]?.title}
        </Text>
        <Text style={styles.descText}>
          {onboardingData[pageNumber]?.description}
        </Text>
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({});
