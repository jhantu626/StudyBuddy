import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../utils/colors';

const AuthLayout = ({children}) => {
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#e7e9f3'}}>
        <View style={styles.absoluteView} />
        {children}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  absoluteView: {
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    height: '65%',
    backgroundColor: colors.authPrimary,
  },
});

export default AuthLayout;
