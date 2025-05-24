import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect} from 'react';
import Layout from '../Layout/Layout';
import MainHeader from '../../../components/Headers/MainHeader';
import {BatchCard} from '../../../components';
import {fonts} from '../../../utils/fonts';
import {colors} from '../../../utils/colors';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAuth} from '../../../Contexts/AuthContext';
import {batchService} from '../../../Services/BatchService';

const Batch = () => {
  const {authToken} = useAuth();
  const navigation = useNavigation();

  const [batches, setBatches] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchBatches = async () => {
    try {
      const data = await batchService.getAllBatches({authToken});
      setBatches(data);
    } catch (error) {
      console.error('Error fetching batches:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBatches();
    }, []),
  );

  return (
    <Layout>
      <MainHeader
        title="Batch List"
        isBackable={true}
        isSelectableValues={false}
      />
      {/* <ScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
          <BatchCard/>          
          <BatchCard/>          
          <BatchCard/>          
      </ScrollView> */}
      <FlatList
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        style={{flexGrow: 1}}
        refreshing={loading}
        data={batches}
        keyExtractor={(item, index) => `batch-${index}`}
        renderItem={({item, index}) => (
          <BatchCard batch={item} key={`batch-card-${index}`} />
        )}
      />
      <TouchableOpacity
        style={styles.floatingBtn}
        onPress={() => {
          navigation.navigate('CreateBatch');
        }}>
        <Text style={styles.btnText}>Create Batch</Text>
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
