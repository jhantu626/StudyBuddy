import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Layout from '../Layout/Layout';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainHeader from '../../../components/Headers/MainHeader';
import {
  BottomSheetInput,
  DefaultInput,
  DropdownInput,
} from '../../../components';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';

const StudentRegistration = () => {
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
            <DefaultInput labelText={'Mobile'} />
            <DefaultInput labelText={'Student Name'} />
            <DropdownInput
              labelText={'Gender'}
              options={['Male', 'Female', 'Others']}
            />
            <BottomSheetInput placeHolder={'Select Batch'} target="batch" />
            <BottomSheetInput placeHolder={'Select Class'} target="class" />
            <BottomSheetInput placeHolder={'Select Subject'} target="subject" />
            <DefaultInput labelText={'Guadian Name'} />
            <DefaultInput labelText={'Guadian Mobile'} />
            <DefaultInput labelText={'Pincode'} />
            <DefaultInput labelText={'District'} />
            <DefaultInput labelText={'State'} />
            <DefaultInput labelText={'Address'} />
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
});

export default StudentRegistration;
