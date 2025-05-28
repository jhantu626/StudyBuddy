import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Layout from '../Layout/Layout';
import MainHeader from '../../../components/Headers/MainHeader';
import {
  AuthSelection,
  BottomSheetInput,
  DefaultInput,
  DropdownInput,
  InrInput,
  MultiSelectDropdownInput,
  TimeInput,
} from '../../../components';
import {days, months, years} from '../../../utils/data';
import {fonts} from '../../../utils/fonts';
import {colors} from '../../../utils/colors';
import CommonBottomSheet from '../../../components/BottomSheets/CommonBottomSheet';
import {teacherService} from '../../../Services/TeacherService';
import {useAuth} from '../../../Contexts/AuthContext';
import {
  convertTo12Hour,
  convertTo24HourFormat,
  isValidBatchName,
} from '../../../utils/helper';
import {batchService} from '../../../Services/BatchService';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../utils/ToastConfig';
import {useNavigation, useRoute} from '@react-navigation/native';

const CreateBatch = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {authToken} = useAuth();
  const mode = route.params?.batchData?.mode || 'CREATE';
  // Data
  const [bottomSheetOpen, setBottomSheetOpen] = useState({
    status: false,
    target: null,
  });
  const [languageOptions, setLanguageOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [boardOptions, setBoardOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  // State Variables
  const [batchName, setBatchName] = useState(
    route?.params?.batchData?.name || '',
  );
  const [batchStartYear, setBatchStartYear] = useState(
    route?.params?.batchData?.startYear || 2025,
  );
  const [batchEndYear, setBatchEndYear] = useState(
    route?.params?.batchData?.endYear || 2025,
  );
  const [batchStartMonth, setBatchStartMonth] = useState(
    route?.params?.batchData?.startMonth || 'Jan',
  );
  const [batchEndMonth, setBatchEndMonth] = useState(
    route?.params?.batchData?.endMonth || 'Jan',
  );
  const [startTime, setStartTime] = useState(
    (route?.params?.batchData?.startTime &&
      convertTo12Hour(route?.params?.batchData?.startTime)) ||
      null,
  );
  const [endTime, setEndTime] = useState(
    (route?.params?.batchData?.startTime &&
      convertTo12Hour(route?.params?.batchData?.endTime)) ||
      null,
  );
  const [selectedClasses, setSelectedClasses] = useState(
    route?.params?.batchData?.classes || [],
  );
  const [selectedSubjects, setSelectedSubjects] = useState(
    route?.params?.batchData?.subjects || [],
  );
  const [selectedBoards, setSelectedBoards] = useState(
    (route?.params?.batchData?.board && [route?.params?.batchData?.board]) ||
      [],
  );
  const [selectedLanguage, setSelectedLanguage] = useState(
    (route?.params?.batchData?.language && [
      route?.params?.batchData?.language,
    ]) ||
      [],
  );
  const [selectedDays, setSelectedDays] = useState(
    route?.params?.batchData?.days || [],
  );
  const [monthlyFees, setMonthlyFees] = useState(
    (route?.params?.batchData?.monthlyFees &&
      route?.params?.batchData?.monthlyFees.toString()) ||
      '',
  );
  const [monthlyExamFees, setMonthlyExamFees] = useState(
    (route?.params?.batchData?.monthlyExamFees &&
      route?.params?.batchData?.monthlyExamFees.toString()) ||
      '',
  );
  // Error State
  const [error, setError] = useState({
    status: false,
    message: '',
  });
  // Loading State
  const [loading, setLoading] = useState(false);

  const YearMonth = ({year, month}) => {
    return (
      <View style={styles.yearMonthContainer}>
        <View style={styles.yearMonthBox}>{year}</View>
        <View style={styles.yearMonthBox}>{month}</View>
      </View>
    );
  };
  // BottomSheet Referance State
  const bottomSheetRef = useRef(null);

  const findMonthByValue = value =>
    Object.keys(months).find(key => months[key] === value);

  useEffect(() => {
    if (bottomSheetOpen.status) {
      bottomSheetRef.current?.snapToIndex(0);
    }
  }, [bottomSheetOpen]);

  const getOptions = async () => {
    try {
      const classOption = await teacherService.getAllClasses({
        authToken: authToken,
      });
      const subjectOption = await teacherService.getAllSubjects({
        authToken: authToken,
      });
      const boardOption = await teacherService.getAllBoards({
        authToken: authToken,
      });
      const languageOption = await teacherService.getAllLanguages({
        authToken: authToken,
      });

      setClassOptions(prev => classOption);
      setSubjectOptions(prev => subjectOption);
      setBoardOptions(prev => boardOption);
      setLanguageOptions(prev => languageOption);
    } catch (error) {
      console.error(error);
    }
  };

  // Default UseEffect
  useEffect(() => {
    console.log('route data ', JSON.stringify(route?.params?.batchData));
    const currentDate = new Date();
    setBatchStartYear(currentDate.getFullYear());
    setBatchStartMonth(findMonthByValue(currentDate.getMonth() + 1));
    const calculationMonth = 12 - (currentDate.getMonth() + 1);
    console.log('calculationMonth', calculationMonth);
    if (calculationMonth < 3) {
      setBatchEndYear(currentDate.getFullYear() + 1);
      setBatchEndMonth(prev =>
        findMonthByValue(
          calculationMonth === 2 ? 1 : calculationMonth === 1 ? 2 : 3,
        ),
      );
    } else {
      setBatchEndYear(currentDate.getFullYear());
      setBatchEndMonth(findMonthByValue(currentDate.getMonth() + 4));
    }
    getOptions();
  }, []);

  const handleCreate = async () => {
    try {
      setLoading(true);
      if (!batchName || !isValidBatchName(batchName)) {
        setError({
          status: true,
          message: 'Please enter a valid batch name.',
        });
        return;
      } else if (
        batchStartYear + months[batchStartMonth] >
        batchEndYear + months[batchEndMonth]
      ) {
        setError({
          status: true,
          message: 'Start date cannot be after end date.',
        });
        return;
      } else if (selectedClasses.length === 0) {
        setError({
          status: true,
          message: 'Please select at least one class.',
        });
        return;
      } else if (selectedSubjects.length === 0) {
        setError({
          status: true,
          message: 'Please select at least one subject.',
        });
        return;
      } else if (selectedBoards.length === 0) {
        setError({
          status: true,
          message: 'Please select board.',
        });
        return;
      } else if (selectedLanguage.length === 0) {
        setError({
          status: true,
          message: 'Please select language.',
        });
        return;
      } else if (!startTime || !endTime) {
        setError({
          status: true,
          message: 'Please select start and end time.',
        });
        return;
      } else if (startTime >= endTime) {
        setError({
          status: true,
          message: 'Start time cannot be after end time.',
        });
        return;
      } else if (selectedDays.length === 0) {
        setError({
          status: true,
          message: 'Please select at least one batch day.',
        });
        return;
      } else if (!monthlyFees || isNaN(monthlyFees)) {
        setError({
          status: true,
          message: 'Please enter a valid monthly fees.',
        });
        return;
      } else if (!monthlyExamFees || isNaN(monthlyExamFees)) {
        setError({
          status: true,
          message: 'Please enter a valid monthly exam fees.',
        });
        return;
      } else {
        setError({
          status: false,
          message: '',
        });
      }
      let data = {};
      if (mode === 'EDIT') {
        data = await batchService.updateBatch({
          authToken: authToken,
          id: route?.params?.batchData?.id,
          batchName: batchName,
          startYear: batchStartYear,
          endYear: batchEndYear,
          startMonth: months[batchStartMonth],
          endMonth: months[batchEndMonth],
          startTime: convertTo24HourFormat(startTime),
          endTime: convertTo24HourFormat(endTime),
          days: selectedDays,
          monthlyFees: monthlyFees,
          monthlyExamFees: monthlyExamFees,
          board: selectedBoards[0],
          language: selectedLanguage[0],
          subjects: selectedSubjects,
          classes: selectedClasses,
        });
        console.log(data);
      } else {
        data = await batchService.createBatch({
          authToken: authToken,
          batchName: batchName,
          startYear: batchStartYear,
          endYear: batchEndYear,
          startMonth: months[batchStartMonth],
          endMonth: months[batchEndMonth],
          startTime: convertTo24HourFormat(startTime),
          endTime: convertTo24HourFormat(endTime),
          days: selectedDays,
          monthlyFees: monthlyFees,
          monthlyExamFees: monthlyExamFees,
          board: selectedBoards[0],
          language: selectedLanguage[0],
          subjects: selectedSubjects,
          classes: selectedClasses,
        });
        resetForm();
      }
      if (data?.status) {
        Toast.show({
          text1: data?.message,
          type: 'success',
          visibilityTime: 3000,
        });
        setTimeout(() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }, 1000);
      } else {
        Toast.show({
          text1: data.message,
          type: 'error',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      console.error('Error creating batch:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setBatchName('');
    setBatchStartYear(2025);
    setBatchEndYear(2025);
    setBatchStartMonth('Jan');
    setBatchEndMonth('Jan');
    setStartTime(null);
    setEndTime(null);
    setSelectedClasses([]);
    setSelectedSubjects([]);
    setSelectedBoards([]);
    setSelectedLanguage([]);
    setSelectedDays([]);
    setMonthlyFees('');
    setMonthlyExamFees('');
  };

  const renderBottomSheetContent = useCallback(() => {
    switch (bottomSheetOpen.target) {
      case 'Class':
        return (
          <AuthSelection
            options={classOptions}
            selectedItems={selectedClasses}
            setSelectedItems={setSelectedClasses}
          />
        );
      case 'Subject':
        return (
          <AuthSelection
            options={subjectOptions}
            selectedItems={selectedSubjects}
            setSelectedItems={setSelectedSubjects}
          />
        );
      case 'Board':
        return (
          <AuthSelection
            options={boardOptions}
            selectedItems={selectedBoards}
            setSelectedItems={setSelectedBoards}
            isMultiSelect={false}
          />
        );
      case 'Language':
        return (
          <AuthSelection
            options={languageOptions}
            selectedItems={selectedLanguage}
            setSelectedItems={setSelectedLanguage}
            isMultiSelect={false}
          />
        );
      default:
        return null;
    }
  }, [
    bottomSheetOpen.target,
    selectedBoards,
    selectedClasses,
    selectedSubjects,
    selectedLanguage,
    classOptions,
    boardOptions,
    subjectOptions,
    languageOptions,
  ]);

  return (
    <Layout>
      <MainHeader
        isBackable={true}
        title={`${mode === 'EDIT' ? 'Edit' : 'Create'} Batch`}
        isSelectableValues={false}
      />
      <View style={styles.container}>
        <ScrollView
          nestedScrollEnabled={true}
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          <DefaultInput
            maxLength={30}
            labelText={'Batch Name'}
            value={batchName}
            setValue={setBatchName}
          />
          <YearMonth
            year={
              <DropdownInput
                labelText={'Start Year'}
                options={years}
                value={batchStartYear}
                setValue={setBatchStartYear}
              />
            }
            month={
              <DropdownInput
                labelText={'Start Month'}
                options={Object.keys(months)}
                value={batchStartMonth}
                setValue={setBatchStartMonth}
              />
            }
          />
          <YearMonth
            year={
              <DropdownInput
                labelText={'End Year'}
                options={years}
                value={batchEndYear}
                setValue={setBatchEndYear}
              />
            }
            month={
              <DropdownInput
                labelText={'End Month'}
                options={Object.keys(months)}
                value={batchEndMonth}
                setValue={setBatchEndMonth}
              />
            }
          />
          <BottomSheetInput
            target="Class"
            selctedItems={selectedClasses}
            setSelectedItems={setSelectedClasses}
            bottomSheetOpen={bottomSheetOpen}
            setBottomSheetOpen={setBottomSheetOpen}
            placeHolder={'Select Classes'}
          />
          <BottomSheetInput
            target="Subject"
            bottomSheetOpen={bottomSheetOpen}
            setBottomSheetOpen={setBottomSheetOpen}
            selctedItems={selectedSubjects}
            setSelectedItems={setSelectedSubjects}
            placeHolder={'Select Subjects'}
          />
          <BottomSheetInput
            target="Board"
            bottomSheetOpen={bottomSheetOpen}
            setBottomSheetOpen={setBottomSheetOpen}
            selctedItems={selectedBoards}
            setSelectedItems={setSelectedBoards}
            placeHolder={'Select Boards'}
            showProperty="code"
          />
          <BottomSheetInput
            target="Language"
            bottomSheetOpen={bottomSheetOpen}
            setBottomSheetOpen={setBottomSheetOpen}
            selctedItems={selectedLanguage}
            setSelectedItems={setSelectedLanguage}
            placeHolder={'Select Language'}
          />
          <Text
            style={{
              fontFamily: fonts.semiBold,
              fontSize: 14,
              color: '#000',
            }}>
            Batch Timing
          </Text>
          <View style={[styles.yearMonthContainer, {marginTop: -10}]}>
            <View style={styles.yearMonthBox}>
              <TimeInput
                value={startTime}
                setValue={setStartTime}
                labelText="Start Time"
              />
            </View>
            <View style={styles.yearMonthBox}>
              <TimeInput
                value={endTime}
                setValue={setEndTime}
                labelText="End Time"
              />
            </View>
          </View>
          <MultiSelectDropdownInput
            labelText={'Batch Days'}
            options={days}
            setSelectedValues={setSelectedDays}
            selectedValues={selectedDays}
            maxDropdownHeight={250}
            dropdownPosition="top"
          />
          <InrInput
            labelText="Monthly Fees"
            value={monthlyFees}
            setValue={setMonthlyFees}
            keyboardType="numeric"
            isBg={true}
          />
          <InrInput
            labelText="Monthly Exam Fees"
            setValue={setMonthlyExamFees}
            value={monthlyExamFees}
            keyboardType="numeric"
          />
          {error.status && (
            <Text
              style={{
                fontFamily: fonts.medium,
                color: 'red',
                textAlign: 'center',
              }}>
              {error.message}
            </Text>
          )}
          <TouchableOpacity
            disabled={loading}
            style={styles.btnContainer}
            onPress={handleCreate}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.btnText}>
                {mode === 'EDIT' ? 'UPDATE' : 'CREATE'}
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>

        {/* Bottom Sheet View */}
        <CommonBottomSheet
          ref={bottomSheetRef}
          snapPoints={['70%']}
          Component={renderBottomSheetContent()}
          duration={300}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    // flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    padding: 20,
    gap: 10,
  },
  yearMonthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  yearMonthBox: {
    width: '48%',
  },
  btnContainer: {
    alignSelf: 'center',
    height: 45,
    width: 120,
    borderRadius: 30,
    backgroundColor: colors.floatingBtnColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#fff',
  },
});

export default CreateBatch;
