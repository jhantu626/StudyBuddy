import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
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
import {months, years} from '../../../utils/data';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {fonts} from '../../../utils/fonts';
import {colors} from '../../../utils/colors';

const CreateBatch = () => {
  // State Variables
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const YearMonth = ({year, month}) => {
    return (
      <View style={styles.yearMonthContainer}>
        <View style={styles.yearMonthBox}>{year}</View>
        <View style={styles.yearMonthBox}>{month}</View>
      </View>
    );
  };
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
          <DefaultInput labelText={'Batch Name'} />
          <YearMonth
            year={<DropdownInput labelText={'Start Year'} options={years} />}
            month={
              <DropdownInput
                labelText={'Start Month'}
                options={Object.keys(months)}
              />
            }
          />
          <YearMonth
            year={<DropdownInput labelText={'End Year'} options={years} />}
            month={
              <DropdownInput
                labelText={'End Month'}
                options={Object.keys(months)}
              />
            }
          />
          <BottomSheetInput placeHolder={'Select Classes'} />
          <BottomSheetInput placeHolder={'Select Subjects'} />
          <BottomSheetInput placeHolder={'Select Boards'} />
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
          <MultiSelectDropdownInput labelText={'Batch Days'} />
          <InrInput labelText="Monthly Fees" />
          <InrInput labelText="Monthly Exam Fees" />
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.btnText}>CREATE</Text>
          </TouchableOpacity>
        </ScrollView>
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
    gap: 15,
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
