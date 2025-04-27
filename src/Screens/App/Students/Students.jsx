import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Layout from '../Layout/Layout';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainHeader from '../../../components/Headers/MainHeader';
import {FilterSelecter, StudentCard} from '../../../components';

const filterOptions = [
  {
    name: 'Subject',
    target: 'subject',
  },
  {
    name: 'Batch Name',
    target: 'batch',
  },
  {
    name: 'Session',
    target: 'session',
  },{
    name: 'Batch Name',
    target: 'batch',
  },
  {
    name: 'Session',
    target: 'session',
  },
  
];

const Students = () => {
  const values = [
    'Class X',
    'Class XI',
    'Class XII',
    'Class IX',
    'Class VIII',
    'Class VII',
  ];
  const [selectedBoard, setSelectedBoard] = useState(values[0]);
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);
  return (
    <Layout>
      <GestureHandlerRootView>
        <View>
          <MainHeader
            title="Students List"
            isBackable={false}
            selectedValue={selectedBoard}
            setSelectedValue={setSelectedBoard}
            values={values}
          />
          <FilterSelecter
            options={filterOptions}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </View>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
            <StudentCard key={index + 'students'} />
          ))}
        </ScrollView>
      </GestureHandlerRootView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 40,
    gap: 10,
    alignItems: 'center',
  },
});

export default Students;
