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
import React, {useEffect, useRef, useState} from 'react';
import PrimaryHeader from '../../components/Headers/PrimaryHeader';
import AuthLayout from './AuthLayout';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  AuthCarousel,
  BottomSheetInput,
  ClassSelection,
  DefaultInput,
  DropdownInput,
} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

const Register = () => {
  // State Values
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('+91 ');
  const [gender, setGender] = useState('');
  const [selectedClass, setSelectedClass] = useState([]);

  // BottomSheet
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState({
    status: true,
    target: 'Classes',
  });
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    console.log(isBottomSheetOpen);
    if (isBottomSheetOpen?.status) {
      bottomSheetRef.current.snapToIndex(0);
    }
  }, [isBottomSheetOpen]);

  const renderBackdrop = props => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.5}
    />
  );

  const renderBottomSheetItem = () => {
    switch (isBottomSheetOpen.target) {
      case 'Classes':
        return (
          <ClassSelection
            selectedItems={selectedClass}
            setSelectedItems={setSelectedClass}
          />
        );

      default:
        return null;
    }
  };

  return (
    <AuthLayout>
      <GestureHandlerRootView style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                <BottomSheetInput
                  target="Classes"
                  bottomSheetOpen={isBottomSheetOpen}
                  setBottomSheetOpen={setIsBottomSheetOpen}
                  selctedItems={selectedClass}
                  setSelectedItems={setSelectedClass}
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
        </TouchableWithoutFeedback>
        <BottomSheet
          snapPoints={['80%']}
          index={-1}
          ref={bottomSheetRef}
          backdropComponent={renderBackdrop}
          enablePanDownToClose
          enableOverDrag={false}
          animationConfigs={{
            duration: 400,
          }}
          onChange={index => {
            if (index === -1) {
              setIsBottomSheetOpen({status: false, target: null});
            }
          }}>
          <BottomSheetScrollView>
            {renderBottomSheetItem()}
          </BottomSheetScrollView>
        </BottomSheet>
      </GestureHandlerRootView>
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
