import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { useAuth } from '../../../Contexts/AuthContext';

const Home = () => {
  const {logout} = useAuth();
  return (
    <View>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
