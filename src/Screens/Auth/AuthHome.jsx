import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';

const AuthHome = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.headerContaier}>
          <Image
            source={require('./../../../assets/Images/onboarding3.webp')}
            style={styles.bannerImage}
          />
          <Text style={styles.title}>Hello</Text>
          <Text style={styles.desc}>
            Wellcome to StudyBuddy, where you can manage your fees
          </Text>
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                // backgroundColor: colors.authPrimary,
                backgroundColor: colors.primary,
              },
            ]}
            onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.btnText, {color: '#fff'}]}>Login</Text>
          </TouchableOpacity>
          <View style={styles.deviderContainer}>
            <View style={styles.dividerBar} />
            <Text
              style={{
                color: '#12121280',
                fontSize: 16,
                fontFamily: fonts.regular,
              }}>
              Or
            </Text>
            <View style={styles.dividerBar} />
          </View>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                borderWidth: 1,
                // borderColor: colors.authPrimary,
                borderColor: colors.primary,
              },
            ]}
            onPress={() => navigation.navigate('Register')}>
            <Text
              style={[
                styles.btnText,
                {
                  // color: colors.authPrimary
                  color: colors.primary,
                },
              ]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  headerContaier: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 36,
    fontFamily: fonts.semiBold,
    // color: colors.authPrimary,
    color: colors.primary,
  },
  desc: {
    width: 230,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#4D4D4D',
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  btn: {
    width: 150,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    fontSize: 14,
    fontFamily: fonts.bold,
  },
  deviderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  dividerBar: {
    width: 16,
    height: 1,
    backgroundColor: '#12121280',
  },
});

export default AuthHome;
