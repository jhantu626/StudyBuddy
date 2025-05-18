import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Layout from '../Layout/Layout';
import MainHeader from '../../../components/Headers/MainHeader';
import {
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

const CreateBatch = () => {
  // Data
  const [bottomSheetOpen, setBottomSheetOpen] = useState({
    status: false,
    target: null,
  });
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

  useEffect(() => {
    console.log('BottomSheet Opened:', bottomSheetOpen);
    if (bottomSheetOpen.status) {
      bottomSheetRef.current?.snapToIndex(0);
    }
  }, [bottomSheetOpen]);

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
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.btnText}>CREATE</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Bottom Sheet View */}
        <CommonBottomSheet
          ref={bottomSheetRef}
          snapPoints={['70%']}
          Component={
            <View>
              {bottomSheetOpen.target && <Text>{bottomSheetOpen.target}</Text>}
            </View>
          }
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
