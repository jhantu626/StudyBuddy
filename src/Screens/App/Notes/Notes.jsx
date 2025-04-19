import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Layout from '../Layout/Layout';
import MainHeader from '../../../components/Headers/MainHeader';

const Notes = () => {
  const values = ['Class X', 'Class XI', 'Class XII', 'Class IX'];
  const [selectedValue, setSelectedValue] = useState(values[0]);
  return (
    <Layout>
      <MainHeader
        title="Notes"
        isBackable={false}
        values={values}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />
    </Layout>
  );
};

export default Notes;

const styles = StyleSheet.create({});
