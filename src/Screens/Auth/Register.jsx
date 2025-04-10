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
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import PrimaryHeader from '../../components/Headers/PrimaryHeader';
import AuthLayout from './AuthLayout';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  AuthCarousel,
  BottomSheetInput,
  AuthSelection,
  DefaultInput,
  DropdownInput,
  SubjectSelection,
} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  boardApi,
  classApi,
  languageApi,
  subjectsApi,
} from '../../utils/CommonApiCall';

const Register = () => {
  // State Values
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('+91 ');
  const [gender, setGender] = useState('');
  const [selectedClass, setSelectedClass] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [isAccept, setIsAccept] = useState(false);

  // Options
  const [classOptions, setClassOptions] = useState([]);
  const [boardOptions, setBoardOptions] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  useEffect(() => {
    classApi({setClassOption: setClassOptions});
    boardApi({setOption: setBoardOptions});
    languageApi({setOption: setLanguageOptions});
    subjectsApi({setOption: setSubjectOptions});
  }, []);

  // BottomSheet
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState({
    status: false,
    target: null,
  });
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    if (isBottomSheetOpen?.status) {
      bottomSheetRef.current.snapToIndex(0);
    }
  }, [isBottomSheetOpen]);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    [],
  );

  const renderBottomSheetItem = useCallback(() => {
    switch (isBottomSheetOpen.target) {
      case 'Classes':
        return (
          <AuthSelection
            selectedItems={selectedClass}
            setSelectedItems={setSelectedClass}
            options={classOptions}
            iconName={'class'}
            placeholder="Search classes..."
          />
        );
      case 'Language':
        return (
          <AuthSelection
            selectedItems={selectedLanguage}
            setSelectedItems={setSelectedLanguage}
            options={languageOptions}
            iconName={'language'}
            placeholder="Search languages..."
          />
        );
      case 'Board':
        return (
          <AuthSelection
            selectedItems={selectedBoard}
            setSelectedItems={setSelectedBoard}
            options={boardOptions}
            iconName={'board'}
            placeholder="Search boards..."
          />
        );
      case 'Subject':
        return (
          <SubjectSelection
            selectedItems={selectedSubject}
            setSelectedItems={setSelectedSubject}
            options={subjectOptions}
            placeholder="Search subjects..."
          />
        );
      default:
        return null;
    }
  }, [
    isBottomSheetOpen.target,
    selectedClass,
    selectedLanguage,
    selectedBoard,
    selectedSubject,
    classOptions,
    languageOptions,
    boardOptions,
    subjectOptions,
  ]);

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
                  placeHolder={'Select your class*'}
                />
                <BottomSheetInput
                  target="Subject"
                  bottomSheetOpen={isBottomSheetOpen}
                  setBottomSheetOpen={setIsBottomSheetOpen}
                  selctedItems={selectedSubject}
                  setSelectedItems={setSelectedSubject}
                  placeHolder={'Select your subjects*'}
                />
                <BottomSheetInput
                  target="Board"
                  bottomSheetOpen={isBottomSheetOpen}
                  setBottomSheetOpen={setIsBottomSheetOpen}
                  selctedItems={selectedBoard}
                  setSelectedItems={setSelectedBoard}
                  placeHolder={'Select education board*'}
                  showProperty="code"
                />

                <BottomSheetInput
                  target="Language"
                  bottomSheetOpen={isBottomSheetOpen}
                  setBottomSheetOpen={setIsBottomSheetOpen}
                  selctedItems={selectedLanguage}
                  setSelectedItems={setSelectedLanguage}
                  placeHolder={'Select your language*'}
                />

                <View style={styles.imageUploadSection}>
                  <TouchableOpacity style={[styles.imageContainer, {gap: 15}]}>
                    <Image
                      style={styles.uploadImage}
                      source={require('./../../../assets/Images/Upload.png')}
                    />
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 5,
                      }}>
                      <Text style={styles.uploadText}>
                        Upload your image here
                      </Text>
                      <Text style={styles.browseText}>Browse</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.userImage}
                      source={require('./../../../assets/Images/User.webp')}
                      resizeMode="contain"
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10,
                  }}
                  onPress={() => setIsAccept(prev => !prev)}>
                  {isAccept ? (
                    <MaterialCommunityIcons
                      name="checkbox-blank-outline"
                      color={colors.primary}
                      size={14}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="checkbox-marked"
                      color={colors.primary}
                      size={14}
                    />
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: fonts.regular,
                      }}>
                      I agree to the
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: fonts.regular,
                        color: colors.primary,
                        textDecorationLine: 'underline',
                      }}>
                      Terms & Condition
                    </Text>
                  </View>
                </TouchableOpacity>

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
          snapPoints={useMemo(() => ['80%'], [])}
          index={-1}
          ref={bottomSheetRef}
          backdropComponent={renderBackdrop}
          enablePanDownToClose
          enableOverDrag={false}
          animationConfigs={{
            duration: 300,
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
    paddingHorizontal: 20,
  },
  cardView: {
    // width: 340,
    width: '100%',
    height: 'auto',
    backgroundColor: colors.background,
    paddingVertical: 20,
    paddingHorizontal: 20,
    zIndex: 2,
    marginTop: -16,
    borderRadius: 20,
    // justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
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
  imageUploadSection: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 140,
    height: 135,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadImage: {
    width: 26,
    height: 26,
  },
  uploadText: {
    fontSize: 8,
    fontFamily: fonts.regular,
    color: '#9895AD',
  },
  browseText: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: '#16AEC3',
    textDecorationLine: 'underline',
  },
  userImage: {
    width: 100,
    height: 100,
  },
});

export default Register;
