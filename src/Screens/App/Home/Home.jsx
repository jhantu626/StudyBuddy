import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useAuth} from '../../../Contexts/AuthContext';
import Layout from '../Layout/Layout';
import { Loader } from '../../../components';

const Home = () => {
  const {logout} = useAuth();
  return (
    <Layout>
      <Loader/>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({});
