import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import PrimaryHeader from '../../components/Headers/PrimaryHeader';
import AuthLayout from './AuthLayout';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AuthCarousel, DefaultInput, DropdownInput} from '../../components';
import {useNavigation} from '@react-navigation/native';

const Register = () => {
  // State Values
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('+91 ');
  const [gender, setGender] = useState('');

  return (
    <AuthLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled">
            <PrimaryHeader title="Registration" />
            <View style={styles.container}>
              <View style={styles.cardView}>
                {/* Form Start */}
                <DefaultInput
                  labelText={'Name'}
                  value={name}
                  setValue={setName}
                />
                <DefaultInput
                  labelText={'Number'}
                  value={mobile}
                  setValue={setMobile}
                  isBg={true}
                  minLength={4}
                  maxLength={14}
                  keyboardType="number-pad"
                />
                <DropdownInput
                  labelText="Gender"
                  value={gender}
                  setValue={setGender}
                  options={['Male', 'Female', 'Others']}
                />
                {/* Form End */}
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
            <View style={styles.carouselContainer}>
              <AuthCarousel />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardView: {
    width: 340,
    height: 'auto',
    backgroundColor: colors.background,
    paddingVertical: 20,
    paddingHorizontal: 20,
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

export default Register;
