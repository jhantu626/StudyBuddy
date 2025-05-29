import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
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

const StudentRegistration = () => {
  const {authToken} = useAuth();
  // Options
  const [batchOptions, setBatchOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [joiningYearOptions, setJoiningYearOptions] = useState([]);

  // State Variables
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

  // Ref
  const bottomSheetRef = useRef(null);
  const [bottomSheetOpen, setBottomSheetOpen] = useState({
    status: false,
    target: null,
  });

  const fetchDetails = async () => {
    try {
      const data = await batchService.getAllBatches({authToken: authToken});
      console.log('Teacher Batches ', data);
      setBatchOptions(data);
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
    console.log('Bottom sheet', bottomSheetOpen);
    if (bottomSheetOpen.status) {
      bottomSheetRef.current.snapToIndex(0);
    }
  }, [bottomSheetOpen]);

  // Batch changing
  useEffect(() => {
    if (selectedBatch.length > 0) {
      setClassOptions(selectedBatch[0]?.classes);
      setSelectedClass([]);
      let arr = [];
      for (
        let i = selectedBatch[0]?.startYear;
        i <= selectedBatch[0]?.endYear;
        i++
      ) {
        console.log(i)
        arr.push(i);
      }
      console.log(arr)
      setJoiningYearOptions(arr);
      setJoiningYear(selectedBatch[0]?.startYear);
      console.log('Selected Batch changed:', JSON.stringify(selectedBatch[0]));
    }
  }, [selectedBatch]);

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
          />
        );
      case 'batch':
        return (
          <AuthSelection
            isMultiSelect={false}
            placeholder="Select Subject"
            options={batchOptions}
            selectedItems={selectedBatch}
            setSelectedItems={setSelectedBatch}
          />
        );
    }
  }, [bottomSheetOpen.target, selectedBatch, selectedClass]);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(prev => false);
    }, 3000);
  };

  return (
    <Layout>
      <GestureHandlerRootView>
        <MainHeader title="Student Registration" isSelectableValues={false} />
        <ScrollView
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
            />
            {error.mobileError && (
              <Text style={styles.errorText}>{error.mobileError}</Text>
            )}
            <DefaultInput
              labelText={'Student Name'}
              value={studentName}
              setValue={setStudentName}
              bgColor={error.studentNameError && colors.error}
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
            />
            {error.guardianNameError && (
              <Text style={styles.errorText}>{error.guardianNameError}</Text>
            )}
            <DefaultInput
              labelText={'Guadian Mobile'}
              value={guardianMobile}
              setValue={setGuardianMobile}
              bgColor={error.guardianMobileError && colors.error}
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
                />
              }
            />
            <DefaultInput
              labelText={'Pincode'}
              value={pincode}
              setValue={setPincode}
              maxLength={6}
              bgColor={error.pincodeError && colors.error}
            />
            {error.pincodeError && (
              <Text style={styles.errorText}>{error.pincodeError}</Text>
            )}
            <DefaultInput
              labelText={'District'}
              value={district}
              setValue={setDistrict}
              bgColor={error.districtError && colors.error}
            />
            {error.districtError && (
              <Text style={styles.errorText}>{error.districtError}</Text>
            )}
            <DefaultInput
              labelText={'State'}
              value={state}
              setValue={setState}
              bgColor={error.stateError && colors.error}
            />
            {error.stateError && (
              <Text style={styles.errorText}>{error.stateError}</Text>
            )}
            <DefaultInput
              labelText={'Address'}
              value={address}
              setValue={setAddress}
              bgColor={error.addressError && colors.error}
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
