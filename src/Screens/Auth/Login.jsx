import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PrimaryHeader from '../../components/Headers/PrimaryHeader';
import AuthLayout from './AuthLayout';
import {colors} from '../../utils/colors';
import {TextInput} from 'react-native-gesture-handler';
import {fonts} from '../../utils/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AuthCarousel} from '../../components';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');

  const handleChangePage = () => {
    if (mobile.length > 0 && mobile.length <= 10) {
      navigation.navigate('Otp', {mobile});
    }
  };

  return (
    <AuthLayout>
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled">
        <PrimaryHeader title="Create Account" />
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Image
              style={styles.bannerImage}
              source={require('./../../../assets/Images/student.webp')}
              resizeMode="contain"
            />
            <View style={styles.cardView}>
              <Text style={styles.title}>
                We need to register your phone number before getting started!
              </Text>
              <View style={styles.inputContainer}>
                <View style={styles.codeContainer}>
                  <Text style={styles.codeText}>+91</Text>
                </View>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Enter Mobile Number"
                  keyboardType="phone-pad"
                  selectionColor={colors.primary}
                  maxLength={10}
                  value={mobile}
                  onChangeText={text => setMobile(text)}
                />
              </View>
              <Text style={styles.lastText}>
                We will send you one time password (OTP)
              </Text>
              <View style={{marginBottom: 50}} />
              <View style={styles.bottomBtn}>
                <TouchableOpacity
                  onPress={handleChangePage}
                  style={styles.nextBtn}>
                  <AntDesign
                    name="arrowright"
                    color="#fff"
                    size={28}
                    style={{transform: [{rotate: '310deg'}]}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.carouselContainer}>
          <AuthCarousel />
        </View>
      </ScrollView>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: 300,
    height: 230,
    zIndex: 1,
  },
  cardView: {
    width: 340,
    height: 'auto',
    backgroundColor: colors.background,
    zIndex: 2,
    marginTop: -16,
    borderRadius: 20,
    // justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    width: 260,
    textAlign: 'center',
    fontFamily: fonts.regular,
    color: '#263238',
    fontSize: 15,
    marginTop: 30,
  },
  inputContainer: {
    width: 260,
    height: 50,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 10,
  },
  codeContainer: {
    width: 40,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 10,
  },
  codeText: {
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  inputBox: {
    flex: 1,
    fontSize: 13,
    fontFamily: fonts.medium,
    color: '#000',
  },
  lastText: {
    marginBottom: 30,
    fontSize: 12,
    fontFamily: fonts.regular,
    width: 200,
    textAlign: 'center',
  },
  bottomBtn: {
    width: 100,
    height: 100,
    position: 'absolute',
    backgroundColor: '#e7e9f3',
    bottom: -55,
    // borderTopEndRadius: 50,
    // borderTopStartRadius: 50,
    borderRadius: 10,
    transform: [{rotate: '45deg'}],
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextBtn: {
    width: 70,
    height: 70,
    backgroundColor: colors.primary,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#fff',
    marginTop: 5,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    marginTop: 80,
  },
});

export default Login;
