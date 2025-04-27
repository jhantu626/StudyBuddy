import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';

const StudentCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image
          source={require('./../../../assets/Images/student1.webp')}
          style={styles.progileImage}
          resizeMode="contain"
        />
        <View style={styles.leftRightContainer}>
          <Text style={styles.nameText}>Pritam Bala</Text>
          <TouchableOpacity style={styles.telephoneContainer}>
            <Entypo name="old-phone" size={14} />
            <Text style={styles.phoneText}>9775746484</Text>
          </TouchableOpacity>
          <ScrollView
            horizontal={true}
            style={{width: '85%'}}
            contentContainerStyle={styles.scrollView}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.subjectContainer}>
              <Text style={styles.subjectsText}>Physics</Text>
            </View>
            <View style={styles.subjectContainer}>
              <Text style={styles.subjectsText}>Chemistry</Text>
            </View>
            <View style={styles.subjectContainer}>
              <Text style={styles.subjectsText}>Mathematics</Text>
            </View>
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity style={styles.goBtn}>
        <Feather name="arrow-right" size={14} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    gap: 10,
    height: '100%',
    alignItems: 'center',
    flex: 1,
  },
  progileImage: {
    width: 60,
    height: 60,
  },
  leftRightContainer: {
    justifyContent: 'center',
    gap: 1.5,
    flex: 1,
  },
  nameText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.floatingBtnColor,
  },
  telephoneContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  phoneText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.authPrimary,
  },
  scrollView: {
    gap: 5,
    // width: '70%',
  },
  subjectContainer: {
    height: 20,
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DEDEED',
    borderRadius: 5,
  },
  subjectsText: {
    fontSize: 8,
    fontFamily: fonts.regular,
    color: '#000',
  },
  goBtn: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9895AD',
  },
});

export default StudentCard;
