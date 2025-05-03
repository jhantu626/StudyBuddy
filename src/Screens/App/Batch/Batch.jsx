import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Layout from '../Layout/Layout';
import MainHeader from '../../../components/Headers/MainHeader';
import {BatchCard} from '../../../components';
import {fonts} from '../../../utils/fonts';
import {colors} from '../../../utils/colors';

const Batch = () => {
  return (
    <Layout>
      <MainHeader
        title="Batch List"
        isBackable={true}
        isSelectableValues={false}
      />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <BatchCard />
        <BatchCard />
        <BatchCard />
      </ScrollView>
      <TouchableOpacity style={styles.floatingBtn}>
        <Text style={styles.btnText}>New Batch</Text>
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
    paddingBottom: 80,
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.floatingBtnColor,
    borderRadius: 30,
  },
  btnText: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: '#ffffff',
  },
});

export default Batch;
