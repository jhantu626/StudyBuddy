import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useAuth} from '../../../Contexts/AuthContext';
import Layout from '../Layout/Layout';

const Home = () => {
  const {logout} = useAuth();
  return (
    <Layout>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({});
