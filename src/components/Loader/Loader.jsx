import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const Loader = () => {
  // Create animated values for each bar
  const opacityValues = Array(12).fill().map(() => new Animated.Value(0));

  useEffect(() => {
    // Animation sequence for each bar
    const animations = opacityValues.map((value, index) => 
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 100),
          Animated.timing(value, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0.25,
            duration: 700,
            useNativeDriver: true,
          }),
        ])
      )
    );

    // Start all animations
    animations.forEach(animation => animation.start());

    // Cleanup
    return () => animations.forEach(animation => animation.stop());
  }, []);

  // Function to generate transform styles for each bar
  const getTransform = (degrees) => [
    { rotate: `${degrees}deg` },
    { translateX: 0 },
    { translateY: -20 }, // Adjusted for React Native (no percentage in translateY)
  ];

  return (
    <View style={styles.container}>
      <View style={styles.loader}>
        {opacityValues.map((opacityValue, index) => (
          <Animated.View
            key={index}
            style={[
              styles.bar,
              { 
                opacity: opacityValue,
                transform: getTransform(index * 30),
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 54,
    height: 54,
    borderRadius: 10,
    position: 'relative',
  },
  bar: {
    width: 4, // 8% of 54 ≈ 4.32
    height: 13, // 24% of 54 ≈ 12.96
    backgroundColor: 'rgb(128, 128, 128)',
    position: 'absolute',
    left: '50%',
    top: '30%',
    marginLeft: -2, // Half of width to center
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default Loader;