import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PrimaryHeader from '../../components/Headers/PrimaryHeader';
import AuthLayout from './AuthLayout';
import {colors} from '../../utils/colors';
import {TextInput} from 'react-native-gesture-handler';
import {fonts} from '../../utils/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AuthCarousel} from '../../components';
import {useRoute} from '@react-navigation/native';

const Otp = () => {
  const route = useRoute();
  const {mobile} = route.params;
  const [timing, setTiming] = useState(30);

  const [otp, setOtp] = useState(['', '', '', '', '']);
  const otpRef = useRef([]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    console.log(newOtp);
    setOtp(newOtp);
    if (index < 4 && newOtp[index] !== '') {
      otpRef.current[index + 1].focus();
    }
  };

  const handleBack = (index, key) => {
    if (key === 'Backspace' && index > 0 && !otp[index]) {
      otpRef.current[index - 1].focus();

      if (otp[index] === '') {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  useEffect(() => {
    if (timing <= 0) return;

    const interval = setInterval(() => {
      setTiming(prev => {
        console.log(prev - 1);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup function
  }, [timing]);

  return (
    <AuthLayout>
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled">
        <PrimaryHeader title="OTP Verification" />
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Image
              style={styles.bannerImage}
              source={require('./../../../assets/Images/student.webp')}
              resizeMode="contain"
            />
            <View style={styles.cardView}>
              <Text style={styles.title}>
                We have set you a 4 digit verification code on{' '}
                <Text style={{color: '#000', fontFamily: fonts.bold}}>
                  +91 {mobile}
                </Text>
              </Text>
              <View style={styles.otpContainer}>
                {otp.map((item, index) => (
                  <TextInput
                    key={index}
                    ref={ref => (otpRef.current[index] = ref)}
                    style={[styles.otpInput, item !== '' && styles.filledOtp]}
                    maxLength={1}
                    keyboardType="number-pad"
                    selectionColor={item !== '' ? '#fff' : colors.primary}
                    textAlignVertical="center"
                    value={item}
                    onChangeText={text => handleChange(text, index)}
                    onKeyPress={({nativeEvent: {key}}) =>
                      handleBack(index, key)
                    }
                  />
                ))}
              </View>
              <Text style={styles.lastText}>
                <Text
                  style={{
                    color: colors.authPrimary
                  }}
                  onPress={()=>console.info("Resending")}>
                  Resend
                </Text>{' '}
                code in {timing>0?formatTime(timing):"Send"}
              </Text>
              <View style={{marginBottom: 50}} />
              <View style={styles.bottomBtn}>
                <TouchableOpacity style={styles.nextBtn}>
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
    fontSize: 13,
    marginTop: 30,
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
  otpContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  otpInput: {
    width: 55,
    height: 50,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fonts.medium,
    color: '#000',
    margin: 0,
    padding: 0,
    includeFontPadding: false,
  },
  filledOtp: {
    backgroundColor: colors.primary,
    color: '#fff',
  },
});

export default Otp;
