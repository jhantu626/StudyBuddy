import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {use, useCallback, useEffect, useRef, useState} from 'react';
import Layout from '../Layout/Layout';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainHeader from '../../../components/Headers/MainHeader';
import {
  AuthSelection,
  BottomSheetInput,
  DefaultInput,
  DropdownInput,
  YearMonth,
} from '../../../components';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';
import CommonBottomSheet from '../../../components/BottomSheets/CommonBottomSheet';
import {useAuth} from '../../../Contexts/AuthContext';
import {teacherService} from '../../../Services/TeacherService';
import {batchService} from '../../../Services/BatchService';
import {
  getMonthOptionsStudentRegistration,
  isValidIndianMobile,
  validateName,
} from '../../../utils/helper';
import {studentService} from '../../../Services/StudentService';
import {MonthNumByMonth} from '../../../utils/data';
import Toast from 'react-native-toast-message';

const StudentRegistration = () => {
  const {authToken} = useAuth();
  // Options
  const [batchOptions, setBatchOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [joiningYearOptions, setJoiningYearOptions] = useState([]);
  const [joiningMonthOptions, setJoiningMonthOptions] = useState([]);

  // State Variables
  const [studentId, setStudentId] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianMobile, setGuardianMobile] = useState('');
  const [pincode, setPincode] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [studentName, setStudentName] = useState('');
  const [gender, setGender] = useState('Male');
  const [selectedClass, setSelectedClass] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState([]);
  const [joiningYear, setJoiningYear] = useState('');
  const [joiningMonth, setJoiningMonth] = useState('');

  // Loading State
  const [isLoading, setIsLoading] = useState(false);

  // Error State
  const [error, setError] = useState({
    mobileError: null,
    studentNameError: null,
    guardianMobileError: null,
    guardianNameError: null,
    pincodeError: null,
    districtError: null,
    addressError: null,
    addressError: null,
    addressError: null,
    classError: null,
    batchError: null,
  });
  const [isStudentExist, setIsStudentExist] = useState(false);

  // Ref
  const bottomSheetRef = useRef(null);
  const [bottomSheetOpen, setBottomSheetOpen] = useState({
    status: false,
    target: null,
  });

  const fetchDetails = async () => {
    try {
      const data = await batchService.getAllBatches({authToken: authToken});
      setBatchOptions(data);
      console.log('batch data', data);
    } catch (error) {
      console.error(error);
    }
  };

  // Default UseEffect
  useEffect(() => {
    fetchDetails();
  }, []);

  // For Bottom Sheet
  useEffect(() => {
    if (bottomSheetOpen.status) {
      bottomSheetRef.current.snapToIndex(0);
    }
  }, [bottomSheetOpen]);

  // Batch changing
  useEffect(() => {
    if (selectedBatch.length > 0) {
      setClassOptions(selectedBatch[0]?.classes);
      if (!isStudentExist) {
        setSelectedClass([]);
      }
      let arr = [];
      for (
        let i = selectedBatch[0]?.startYear;
        i <= selectedBatch[0]?.endYear;
        i++
      ) {
        arr.push(i);
      }
      setJoiningYearOptions(arr);
      setJoiningYear(prev => selectedBatch[0]?.startYear);
      console.log('Selected Batch changed:', selectedBatch[0]);
      // for(int i=selectedBatch[0].joingIn)
    }
  }, [selectedBatch]);

  // For Year Change
  useEffect(() => {
    const monthOptions = getMonthOptionsStudentRegistration(
      joiningYear,
      selectedBatch[0]?.startYear,
      selectedBatch[0]?.endYear,
      selectedBatch[0]?.startMonth,
      selectedBatch[0]?.endMonth,
    );
    setJoiningMonthOptions(monthOptions);
    setJoiningMonth('');
  }, [joiningYearOptions, joiningYear]);

  const renderBottomSheetContent = useCallback(() => {
    switch (bottomSheetOpen.target) {
      case 'class':
        return (
          <AuthSelection
            isMultiSelect={false}
            placeholder="Select Class"
            options={classOptions}
            selectedItems={selectedClass}
            setSelectedItems={setSelectedClass}
            isChangable={!isStudentExist}
          />
        );
      case 'batch':
        return (
          <AuthSelection
            isMultiSelect={false}
            placeholder="Select Batch"
            options={
              isStudentExist
                ? batchOptions.filter(item =>
                    item.classes.some(cl => cl.id === selectedClass[0]?.id),
                  )
                : batchOptions
            }
            selectedItems={selectedBatch}
            setSelectedItems={setSelectedBatch}
          />
        );
    }
  }, [bottomSheetOpen.target, selectedBatch, selectedClass]);

  useEffect(() => {
    if (!isValidIndianMobile(mobile) && mobile.length > 0) {
      setError(prev => ({...prev, mobileError: 'Invalid Mobile Number'}));
    } else {
      setError(prev => ({...prev, mobileError: null}));
      if (mobile.length === 10) {
        checkStudentExist();
      }
    }
  }, [mobile]);

  // get student is exist or not
  const checkStudentExist = async () => {
    try {
      console.log('inside the check Student Exist');
      const data = await studentService.isStudentExist({
        mobile: mobile,
        authToken: authToken,
      });
      // setIsStudentExist(data);
      console.log('student exist ', data);
      setIsStudentExist(data?.status);
      if (data?.status) {
        const studentData = await studentService.getStudentByMobileNumber({
          mobile: mobile,
          authToken: authToken,
        });
        setStudentName(studentData?.name);
        setGuardianName(studentData?.guardianName);
        setGuardianMobile(studentData?.guardianPhone);
        setGender(studentData?.gender);
        setSelectedClass(prev => [studentData.joiningClass]);
        setPincode(studentData?.pinCode);
        setDistrict(studentData?.district);
        setState(studentData?.state);
        setAddress(studentData?.address);
        setStudentId(studentData?.id);
        setSelectedBatch([]);

        console.log('studentData ', JSON.stringify(studentData));
      } else {
        setStudentName('');
        setGuardianName('');
        setGuardianMobile('');
        setGender('');
        setSelectedClass([]);
        setPincode('');
        setDistrict('');
        setState('');
        setAddress('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Validate Form
  const validateForm = () => {
    const newErrors = {};

    // Validate Student Name
    const studentNameValidation = validateName(studentName);
    if (studentNameValidation.status) {
      newErrors.studentNameError = studentNameValidation.msg;
    }

    // Validate Guardian Name
    const guardianNameValidation = validateName(guardianName);
    if (guardianNameValidation.status) {
      newErrors.guardianNameError = guardianNameValidation.msg;
    }

    // Validate Student Mobile
    if (!isValidIndianMobile(mobile)) {
      newErrors.mobileError = 'Invalid student mobile number.';
    }

    // Validate Guardian Mobile
    if (!isValidIndianMobile(guardianMobile)) {
      newErrors.guardianMobileError = 'Invalid guardian mobile number.';
    }

    // Validate Pincode
    if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincodeError = 'Invalid pincode. Must be 6 digits.';
    }

    // Validate District
    if (!district.trim()) {
      newErrors.districtError = 'District is required.';
    }

    // Validate Address
    if (!address.trim()) {
      newErrors.addressError = 'Address is required.';
    }

    // Validate Class
    if (!selectedClass || selectedClass.length === 0) {
      newErrors.classError = 'Please select at least one class.';
    }

    // Validate Batch
    if (!selectedBatch || selectedBatch.length === 0) {
      newErrors.batchError = 'Please select at least one batch.';
    }

    setError(newErrors);

    if (!joiningMonth) {
      ToastAndroid.show('Please select month', ToastAndroid.SHORT);
      return false;
    }

    if (!joiningYear) {
      ToastAndroid.show('Please select year', ToastAndroid.SHORT);
      return false;
    }

    return Object.keys(newErrors).length === 0; // true means form is valid
  };

  const handleSubmit = async () => {
    if (isStudentExist && validateForm()) {
      const data = await studentService.assignStudents({
        authToken: authToken,
        batchId: selectedBatch[0]?.id,
        studentId: studentId,
        joiningMonth: MonthNumByMonth[joiningMonth],
        joiningYear: joiningYear,
      });

      console.log('data', data);
      if (data?.status) {
        ToastAndroid.show(data?.message, ToastAndroid.LONG);
        resetForm();
      } else {
        ToastAndroid.show(data?.message, ToastAndroid.LONG);
      }
      return;
    }
    if (validateForm()) {
      setIsLoading(true);
      try {
        console.log('JOingin month ', MonthNumByMonth[joiningMonth]);
        const data = await studentService.createStudentWithoutProfilePic({
          address: address,
          batchId: selectedBatch[0]?.id,
          district: district,
          guardianName: guardianName,
          guardianPhone: guardianMobile,
          gender: gender,
          joiningClass: selectedClass[0],
          joiningMonth: MonthNumByMonth[joiningMonth],
          joiningYear: joiningYear,
          mobile: mobile,
          name: studentName,
          pinCode: pincode,
          state: state,
          authToken: authToken,
        });
        console.log('data', data);
        if (data?.status) {
          ToastAndroid.show(
            'Student Registered Successfully',
            ToastAndroid.LONG,
          );
          resetForm();
        } else {
          ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
        }
      } catch (error) {
        console.error('Error sutdent registration ', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetForm = () => {
    setGuardianName('');
    setGuardianMobile('');
    setPincode('');
    setDistrict('');
    setState('');
    setAddress('');
    setMobile('');
    setStudentName('');
    setGender('Male');
    setSelectedClass([]);
    setSelectedBatch([]);
    setJoiningYear('');
    setJoiningMonth('');
  };

  return (
    <Layout>
      <GestureHandlerRootView>
        <MainHeader title="Student Registration" isSelectableValues={false} />
        <ScrollView
          nestedScrollEnabled={true}
          style={{
            flex: 1,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
          <View style={styles.container}>
            <DefaultInput
              labelText={'Mobile'}
              value={mobile}
              setValue={setMobile}
              bgColor={error.mobileError && colors.error}
              keyboardType="phone-pad"
              maxLength={10}
            />
            {error.mobileError && (
              <Text style={styles.errorText}>{error.mobileError}</Text>
            )}
            <DefaultInput
              labelText={'Student Name'}
              value={studentName}
              setValue={setStudentName}
              bgColor={error.studentNameError && colors.error}
              disabled={isStudentExist}
            />
            {error.studentNameError && (
              <Text style={styles.errorText}>{error.studentNameError}</Text>
            )}
            <DropdownInput
              labelText={'Gender'}
              options={['Male', 'Female', 'Others']}
              value={gender}
              setValue={setGender}
            />
            <DefaultInput
              labelText={'Guadian Name'}
              value={guardianName}
              setValue={setGuardianName}
              bgColor={error.guardianNameError && colors.error}
              disabled={isStudentExist}
            />
            {error.guardianNameError && (
              <Text style={styles.errorText}>{error.guardianNameError}</Text>
            )}
            <DefaultInput
              labelText={'Guadian Mobile'}
              value={guardianMobile}
              setValue={setGuardianMobile}
              bgColor={error.guardianMobileError && colors.error}
              disabled={isStudentExist}
            />
            {error.guardianMobileError && (
              <Text style={styles.errorText}>{error.guardianMobileError}</Text>
            )}
            <BottomSheetInput
              placeHolder={'Select Batch'}
              target="batch"
              borderColor={error.batchError && colors.error}
              bottomSheetOpen={bottomSheetOpen}
              setBottomSheetOpen={setBottomSheetOpen}
              selctedItems={selectedBatch}
              setSelectedItems={setSelectedBatch}
            />
            {error.batchError && (
              <Text style={styles.errorText}>{error.batchError}</Text>
            )}
            <BottomSheetInput
              placeHolder={'Joining Class'}
              target="class"
              borderColor={error.classError && colors.error}
              bottomSheetOpen={bottomSheetOpen}
              setBottomSheetOpen={setBottomSheetOpen}
              selctedItems={selectedClass}
              setSelectedItems={setSelectedClass}
            />
            {error.classError && (
              <Text style={styles.errorText}>{error.classError}</Text>
            )}
            <YearMonth
              year={
                <DropdownInput
                  labelText={'Joining Year'}
                  value={joiningYear}
                  setValue={setJoiningYear}
                  options={joiningYearOptions}
                />
              }
              month={
                <DropdownInput
                  labelText={'Joining Month'}
                  value={joiningMonth}
                  setValue={setJoiningMonth}
                  options={joiningMonthOptions}
                />
              }
            />
            <DefaultInput
              labelText={'Pincode'}
              value={pincode}
              setValue={setPincode}
              maxLength={6}
              bgColor={error.pincodeError && colors.error}
              disabled={isStudentExist}
            />
            {error.pincodeError && (
              <Text style={styles.errorText}>{error.pincodeError}</Text>
            )}
            <DefaultInput
              labelText={'District'}
              value={district}
              setValue={setDistrict}
              bgColor={error.districtError && colors.error}
              disabled={isStudentExist}
            />
            {error.districtError && (
              <Text style={styles.errorText}>{error.districtError}</Text>
            )}
            <DefaultInput
              labelText={'State'}
              value={state}
              setValue={setState}
              bgColor={error.stateError && colors.error}
              disabled={isStudentExist}
            />
            {error.stateError && (
              <Text style={styles.errorText}>{error.stateError}</Text>
            )}
            <DefaultInput
              labelText={'Address'}
              value={address}
              setValue={setAddress}
              bgColor={error.addressError && colors.error}
              disabled={isStudentExist}
            />
            {error.addressError && (
              <Text style={styles.errorText}>{error.addressError}</Text>
            )}
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isLoading}
              style={[styles.btn, isLoading && {width: 95}]}>
              {isLoading ? (
                <ActivityIndicator size={'small'} color={'#fff'} />
              ) : (
                <Text style={styles.btnText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>

        <CommonBottomSheet
          snapPoints={['50%']}
          duration={350}
          Component={renderBottomSheetContent()}
          ref={bottomSheetRef}
        />
      </GestureHandlerRootView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
    marginBottom: 50,
  },
  btn: {
    height: 45,
    backgroundColor: colors.floatingBtnColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  btnText: {
    fontFamily: fonts.medium,
    color: '#fff',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 11,
    fontFamily: fonts.semiBold,
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginTop: -5,
  },
});

export default StudentRegistration;
