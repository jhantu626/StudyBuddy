// import React, { useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Animated,
//   StyleSheet,
//   Easing,
//   Dimensions,
// } from 'react-native';

// const CustomAlert = ({ visible, onCancel, onDelete }) => {
//   const scaleAnim = useRef(new Animated.Value(0)).current;
//   const opacityAnim = useRef(new Animated.Value(0)).current;
//   const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

//   React.useEffect(() => {
//     if (visible) {
//       Animated.parallel([
//         Animated.timing(scaleAnim, {
//           toValue: 1,
//           duration: 300,
//           easing: Easing.out(Easing.back(1.2)),
//           useNativeDriver: true,
//         }),
//         Animated.timing(opacityAnim, {
//           toValue: 1,
//           duration: 200,
//           useNativeDriver: true,
//         }),
//       ]).start();
//     } else {
//       scaleAnim.setValue(0);
//       opacityAnim.setValue(0);
//     }
//   }, [visible]);

//   if (!visible) return null;

//   return (
//     <View style={[StyleSheet.absoluteFill, styles.fullScreenContainer]}>
//       {/* Semi-transparent overlay */}
//       <Animated.View
//         style={[
//           styles.overlay,
//           {
//             opacity: opacityAnim,
//           },
//         ]}
//       />

//       {/* Centered alert box */}
//       <Animated.View
//         style={[
//           styles.alertContainer,
//           {
//             transform: [{ scale: scaleAnim }],
//           },
//         ]}
//       >
//         <Text style={styles.title}>Delete Batch</Text>
//         <Text style={styles.message}>
//           Are you sure you want to delete this batch?
//         </Text>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.button} onPress={onCancel}>
//             <Text style={styles.cancelText}>Cancel</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={onDelete}>
//             <Text style={styles.deleteText}>Delete</Text>
//           </TouchableOpacity>
//         </View>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   fullScreenContainer: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 999, // Ensure it appears above other elements
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   alertContainer: {
//     width: '80%',
//     backgroundColor: 'white',
//     borderRadius: 14,
//     padding: 16,
//     alignSelf: 'center',
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 17,
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   message: {
//     fontSize: 14,
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   button: {
//     padding: 10,
//     minWidth: 80,
//     alignItems: 'center',
//   },
//   cancelText: {
//     color: '#007AFF',
//     fontWeight: '600',
//   },
//   deleteText: {
//     color: 'red',
//     fontWeight: '600',
//   },
// });

// export default CustomAlert;









import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';

const CustomAlert = ({
  visible,
  onCancel,
  onDelete,
  startPosition = { x: 325.321045, y: 130.636154 },
  closeOnOutsideClick = false, 
  text1,
  text2
}) => {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateXAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  React.useEffect(() => {
    if (visible) {
      // Set initial position based on startPosition prop
      translateXAnim.setValue(startPosition.x - screenWidth / 2);
      translateYAnim.setValue(startPosition.y - screenHeight / 2);
      scaleAnim.setValue(0.5); // Start slightly scaled down for pop effect
      opacityAnim.setValue(0);

      // Open animation with smooth timing
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateXAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Close animation: shrink and move back to startPosition
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.5,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateXAnim, {
          toValue: startPosition.x - screenWidth / 2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: startPosition.y - screenHeight / 2,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, startPosition, screenWidth, screenHeight]);

  if (!visible) return null;

  return (
    <View style={[StyleSheet.absoluteFill, styles.fullScreenContainer]}>
      {/* Semi-transparent overlay with optional click handling */}
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: opacityAnim,
          },
        ]}
      >
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={() => closeOnOutsideClick && onCancel()}
          activeOpacity={1} // Prevents visual feedback on press
        />
      </Animated.View>

      {/* Centered alert box with translation */}
      <Animated.View
        style={[
          styles.alertContainer,
          {
            transform: [
              { scale: scaleAnim },
              { translateX: translateXAnim },
              { translateY: translateYAnim },
            ],
          },
        ]}
      >
        <Text style={styles.title}>{text1}</Text>
        <Text style={styles.message}>
          {text2}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onDelete}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, // Ensure it appears above other elements
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  alertContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 16,
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    padding: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  deleteText: {
    color: 'red',
    fontWeight: '600',
  },
});

export default CustomAlert;