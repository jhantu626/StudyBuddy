import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Layout from '../Layout/Layout';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainHeader from '../../../components/Headers/MainHeader';
import {FilterSelecter} from '../../../components';

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
      </GestureHandlerRootView>
    </Layout>
  );
};

export default Students;

const styles = StyleSheet.create({});
