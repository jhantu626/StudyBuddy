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

const classOptions = [
  {id: 1, name: 'Nursery'},
  {id: 2, name: 'LKG'},
  {id: 3, name: 'UKG'},
  {id: 4, name: 'Class 1'},
  {id: 5, name: 'Class 2'},
  {id: 6, name: 'Class 3'},
  {id: 7, name: 'Class 4'},
  {id: 8, name: 'Class 5'},
  {id: 9, name: 'Class 6'},
  {id: 10, name: 'Class 7'},
  {id: 11, name: 'Class 8'},
  {id: 12, name: 'Class 9'},
  {id: 13, name: 'Class 10'},
  {id: 14, name: 'Class 11'},
  {id: 15, name: 'Class 12'},
];

const languageOptions = [
  {id: 1, name: 'English'},
  {id: 2, name: 'Hindi'},
  {id: 3, name: 'Tamil'},
  {id: 4, name: 'Telugu'},
  {id: 5, name: 'Kannada'},
  {id: 6, name: 'Malayalam'},
  {id: 7, name: 'Gujarati'},
  {id: 8, name: 'Marathi'},
  {id: 9, name: 'Bengali'},
  {id: 10, name: 'Punjabi'},
  {id: 11, name: 'Urdu'},
  {id: 12, name: 'Sanskrit'},
  {id: 13, name: 'French'},
  {id: 14, name: 'German'},
  {id: 15, name: 'Spanish'},
];

const boardOptions = [
  {id: 1, name: 'CBSE'},
  {id: 2, name: 'ICSE'},
  {id: 3, name: 'State Board'},
  {id: 4, name: 'IB (International Baccalaureate)'},
  {id: 5, name: 'IGCSE (Cambridge)'},
  {id: 6, name: 'CISCE'},
  {id: 7, name: 'NIOS'},
  {id: 8, name: 'Matriculation'},
  {id: 9, name: 'Anglo-Indian'},
  {id: 10, name: 'SSC (Secondary School Certificate)'},
  {id: 11, name: 'HSC (Higher Secondary Certificate)'},
  {id: 12, name: 'KSSEB (Karnataka)'},
  {id: 13, name: 'MSBSHSE (Maharashtra)'},
  {id: 14, name: 'TNBSE (Tamil Nadu)'},
  {id: 15, name: 'WBCHSE (West Bengal)'},
];

const subjectOptions = [
  {id: 1, name: 'Mathematics'},
  {id: 2, name: 'Science'},
  {id: 3, name: 'Physics'},
  {id: 4, name: 'Chemistry'},
  {id: 5, name: 'Biology'},
  {id: 6, name: 'English'},
  {id: 7, name: 'Hindi'},
  {id: 8, name: 'Sanskrit'},
  {id: 9, name: 'Social Studies'},
  {id: 10, name: 'History'},
  {id: 11, name: 'Geography'},
  {id: 12, name: 'Civics'},
  {id: 13, name: 'Economics'},
  {id: 14, name: 'Computer Science'},
  {id: 15, name: 'Environmental Science'},
  {id: 16, name: 'General Knowledge'},
  {id: 17, name: 'Physical Education'},
  {id: 18, name: 'Business Studies'},
  {id: 19, name: 'Accountancy'},
  {id: 20, name: 'Political Science'},
];

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
            placeholder="Search boards..."
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
                      source={require('./../../../assets/Images/User.png')}
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
          snapPoints={['80%']}
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
  imageUploadSection: {
    width: '100%',
    flexDirection: 'row',
    // gap: 10,
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
