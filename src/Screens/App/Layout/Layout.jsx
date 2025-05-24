import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../../utils/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../../../utils/ToastConfig';

const Layout = ({children}) => {
  const inset = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? inset.top : 0,
      }}>
      <StatusBar backgroundColor="#07A6BC" barStyle="dark-content" />
      {children}
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

export default Layout;
