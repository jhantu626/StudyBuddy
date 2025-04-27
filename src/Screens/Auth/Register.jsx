import {
  ActivityIndicator,
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
  checkTeacherByMobile,
  classApi,
  languageApi,
  subjectsApi,
} from '../../utils/CommonApiCall';
import Toast from 'react-native-toast-message';
import {pickImageAndCrop} from '../../utils/ImagePicker';
import {isValidIndianMobile, validateName} from '../../utils/helper';
import {authService} from '../../Services/AuthService';

const Register = () => {
  const navigation = useNavigation();
  // State Values
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('+91 ');
  const [gender, setGender] = useState('Male');
  const [selectedClass, setSelectedClass] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [isAccept, setIsAccept] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  // Options
  const [classOptions, setClassOptions] = useState([]);
  const [boardOptions, setBoardOptions] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  //Errors
  const [mobileError, setMobileError] = useState({status: false});
  const [appError, setAppError] = useState({
    status: false,
    target: null,
    msg: null,
  });
  const [userAlreasyExist, setUserAlreadyExist] = useState(false);

  // Loading State
  const [isLoading, setIsLoading] = useState(false);

  const snapPoints = useMemo(() => ['80%'], []);

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

  // Check MobileNumber
  useEffect(() => {
    const checkMobile = async () => {
      if (mobile.length === 14) {
        if (isValidIndianMobile(mobile)) {
          const isUserExist = await checkTeacherByMobile({
            mobileNumber: mobile.substring(4),
          });
          setUserAlreadyExist(isUserExist);
          if (isUserExist) {
            setMobileError({status: true, msg: 'User Already Exist.'});
          } else {
            setMobileError({status: false, msg: ''});
          }
        } else {
          setMobileError({status: true, msg: 'Enter a valid mobile number'});
        }
      } else {
        setMobileError({status: false, msg: ''});
      }
    };

    checkMobile();
  }, [mobile]);

  const handleSubmit = async () => {
    const validName = validateName(name);
    // Name Validation
    if (validName.status) {
      setAppError(validName);
      Toast.show({
        text1: 'Enter a valid name',
        type: 'info',
      });
      return;
    } else {
      setAppError({status: true});
    }

    if (!isValidIndianMobile(mobile.substring(4))) {
      setMobileError({status: true, msg: 'Enter a valid mobile number'});
      Toast.show({
        text1: 'Enter a valid mobile number',
        type: 'info',
      });
      return;
    } else {
      setMobileError({status: false});
    }

    // Class Validation
    if (selectedClass.length === 0) {
      Toast.show({
        text1: 'Classes is required',
        type: 'info',
        swipeable: true,
      });
      setAppError({
        target: 'class',
        status: true,
        msg: 'Class selection cannot be empty. Please choose one or more classes.',
      });
      return;
    }

    if (selectedSubject.length === 0) {
      Toast.show({
        text1: 'Subjects is required',
        type: 'info',
        swipeable: true,
      });
      setAppError({
        target: 'subject',
        status: true,
        msg: 'Subject selection cannot be empty. Please choose one or more classes.',
      });
      return;
    }

    if (selectedBoard.length === 0) {
      Toast.show({
        text1: 'Boards are required',
        type: 'info',
        swipeable: true,
      });
      setAppError({
        target: 'board',
        status: true,
        msg: 'Boards selection cannot be empty. Please choose one or more classes.',
      });
      return;
    }

    if (selectedLanguage.length === 0) {
      Toast.show({
        text1: 'Languages are required',
        type: 'info',
        swipeable: true,
      });
      setAppError({
        target: 'language',
        status: true,
        msg: 'Language selection cannot be empty. Please choose one or more classes.',
      });
      return;
    }
    if (!profileImage) {
      Toast.show({
        text1: 'Profile image is required',
        type: 'info',
        swipeable: true,
      });
      setAppError({
        target: 'profile',
        status: true,
        msg: 'Profile photo is missing. Please upload one.',
      });
      return;
    }

    try {
      setIsLoading(true);
      const data = await authService.registerTeacher({
        name: name,
        phone: mobile.substring(4),
        gender: gender,
        boards: selectedBoard,
        classes: selectedClass,
        languages: selectedLanguage,
        subjects: selectedSubject,
        profilePicture: profileImage,
      });
      if (data.status) {
        Toast.show({
          text1: data.message,
          type: 'success',
        });
        setTimeout(() => {
          resetForm();
          navigation.navigate('Login');
        }, 1500);
      } else {
        Toast.show({
          text1: data.message,
          type: 'error',
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setMobile('+91 ');
    setGender('Male');
    setSelectedClass([]);
    setSelectedLanguage([]);
    setSelectedBoard([]);
    setSelectedSubject([]);
    setIsAccept(false);
    setProfileImage(null);
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
                <View style={{width: '100%'}}>
                  <DefaultInput
                    labelText={'Name'}
                    value={name}
                    setValue={setName}
                    bgColor={
                      appError.status && appError.target === 'name'
                        ? '#FF0000'
                        : null
                    }
                  />
                  {appError.status && appError.target === 'name' && (
                    <Text style={styles.error} accessibilityRole="alert">
                      {appError.msg}
                    </Text>
                  )}
                </View>
                <View style={{width: '100%'}}>
                  <DefaultInput
                    labelText={'Number'}
                    value={mobile}
                    setValue={setMobile}
                    isBg={true}
                    minLength={4}
                    maxLength={14}
                    keyboardType="number-pad"
                    bgColor={mobileError.status ? '#FF0000' : null}
                  />
                  {mobileError.status && (
                    <Text style={styles.error} accessibilityRole="alert">
                      {mobileError.msg}
                    </Text>
                  )}
                </View>
                <View style={{width: '100%'}}>
                  <DropdownInput
                    labelText="Gender"
                    value={gender}
                    setValue={setGender}
                    options={['Male', 'Female', 'Others']}
                  />
                </View>
                <View style={{width: '100%'}}>
                  <BottomSheetInput
                    target="Classes"
                    bottomSheetOpen={isBottomSheetOpen}
                    setBottomSheetOpen={setIsBottomSheetOpen}
                    selctedItems={selectedClass}
                    setSelectedItems={setSelectedClass}
                    placeHolder={'Select your class*'}
                    borderColor={
                      appError.status && appError.target === 'class'
                        ? 'red'
                        : null
                    }
                  />
                  {appError.status && appError.target === 'class' && (
                    <Text style={styles.error} accessibilityRole="alert">
                      {appError.msg}
                    </Text>
                  )}
                </View>
                <View style={{width: '100%'}}>
                  <BottomSheetInput
                    target="Subject"
                    bottomSheetOpen={isBottomSheetOpen}
                    setBottomSheetOpen={setIsBottomSheetOpen}
                    selctedItems={selectedSubject}
                    setSelectedItems={setSelectedSubject}
                    placeHolder={'Select your subjects*'}
                    borderColor={
                      appError.status && appError.target === 'subject'
                        ? 'red'
                        : null
                    }
                  />
                  {appError.status && appError.target === 'subject' && (
                    <Text style={styles.error} accessibilityRole="alert">
                      {appError.msg}
                    </Text>
                  )}
                </View>
                <View style={{width: '100%'}}>
                  <BottomSheetInput
                    target="Board"
                    bottomSheetOpen={isBottomSheetOpen}
                    setBottomSheetOpen={setIsBottomSheetOpen}
                    selctedItems={selectedBoard}
                    setSelectedItems={setSelectedBoard}
                    placeHolder={'Select education board*'}
                    showProperty="code"
                    borderColor={
                      appError.status && appError.target === 'board'
                        ? 'red'
                        : null
                    }
                  />
                  {appError.status && appError.target === 'board' && (
                    <Text style={styles.error} accessibilityRole="alert">
                      {appError.msg}
                    </Text>
                  )}
                </View>

                <View style={{width: '100%'}}>
                  <BottomSheetInput
                    target="Language"
                    bottomSheetOpen={isBottomSheetOpen}
                    setBottomSheetOpen={setIsBottomSheetOpen}
                    selctedItems={selectedLanguage}
                    setSelectedItems={setSelectedLanguage}
                    placeHolder={'Select your language*'}
                    borderColor={
                      appError.status && appError.target === 'language'
                        ? 'red'
                        : null
                    }
                  />
                  {appError.status && appError.target === 'language' && (
                    <Text style={styles.error} accessibilityRole="alert">
                      {appError.msg}
                    </Text>
                  )}
                </View>

                <View style={{width: '100%'}}>
                  <View style={[styles.imageUploadSection]}>
                    <TouchableOpacity
                      style={[
                        styles.imageContainer,
                        {gap: 15},
                        appError.status &&
                          appError.target === 'profile' && {borderColor: 'red'},
                      ]}
                      onPress={async () => {
                        await pickImageAndCrop({setImage: setProfileImage});
                      }}>
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
                        <Text
                          style={[
                            styles.browseText,
                            appError.status &&
                              appError.target === 'profile' && {
                                color: 'red',
                              },
                          ]}>
                          Browse
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.imageContainer}>
                      {profileImage ? (
                        <Image
                          style={[
                            styles.userImage,
                            {width: '100%', height: '100%', overflow: 'hidden'},
                          ]}
                          source={profileImage}
                          resizeMode="cover"
                        />
                      ) : (
                        <Image
                          style={styles.userImage}
                          source={require('./../../../assets/Images/User.webp')}
                          resizeMode="contain"
                        />
                      )}
                    </View>
                  </View>
                  {appError.status && appError.target === 'profile' && (
                    <Text style={styles.error} accessibilityRole="alert">
                      {appError.msg}
                    </Text>
                  )}
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
                  <TouchableOpacity
                    style={styles.nextBtn}
                    onPressOut={handleSubmit}
                    disabled={isLoading || mobileError.status}>
                    {isLoading ? (
                      <ActivityIndicator size={'large'} color={'#ffffff'} />
                    ) : (
                      <AntDesign
                        name="arrowright"
                        color="#fff"
                        size={28}
                        style={{transform: [{rotate: '310deg'}]}}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.carouselContainer}>
            {/* <AuthCarousel /> */}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
        <BottomSheet
          snapPoints={snapPoints}
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
    overflow: 'hidden',
  },
  uploadImage: {
    width: 26,
    height: 26,
  },
  uploadText: {
    fontSize: 8,
    fontFamily: fonts.regular,
    color: '#9895AD',
    textAlign: 'center',
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
  error: {
    color: colors.error,
    fontSize: 11,
    fontFamily: fonts.semiBold,
    paddingHorizontal: 10,
    marginTop: 3,
  },
});

export default Register;
