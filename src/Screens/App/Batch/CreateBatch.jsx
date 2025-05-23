import {
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

const CreateBatch = () => {
  const {authToken} = useAuth();
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
  const [batchName, setBatchName] = useState('');
  const [batchStartYear, setBatchStartYear] = useState(2025);
  const [batchEndYear, setBatchEndYear] = useState(2025);
  const [batchStartMonth, setBatchStartMonth] = useState('Jan');
  const [batchEndMonth, setBatchEndMonth] = useState('Jan');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedBoards, setSelectedBoards] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [monthlyFees, setMonthlyFees] = useState('');
  const [monthlyExamFees, setMonthlyExamFees] = useState('');
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
    const currentDate = new Date();
    currentDate.setMonth(8);
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
    console.log(
      'batchName',
      batchName,
      'batchStartYear',
      batchStartYear,
      'batchStartMonth',
      batchStartMonth,
      'batchEndYear',
      batchEndYear,
      'batchEndMonth',
      batchEndMonth,
      'selectedClasses',
      selectedClasses,
      'selectedSubjects',
      selectedSubjects,
      'selectedBoards',
      selectedBoards,
      'startTime',
      startTime,
      'endTime',
      endTime,
      'selectedDays',
      selectedDays,
      'monthlyFees',
      monthlyFees,
      'monthlyExamFees',
      monthlyExamFees,
    );
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
        title="Create Batch"
        isSelectableValues={false}
      />
      <View style={styles.container}>
        <ScrollView
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
          <TouchableOpacity style={styles.btnContainer} onPress={handleCreate}>
            <Text style={styles.btnText}>CREATE</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Bottom Sheet View */}
        <CommonBottomSheet
          ref={bottomSheetRef}
          snapPoints={['70%']}
          Component={renderBottomSheetContent()}
          duration={100}
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
