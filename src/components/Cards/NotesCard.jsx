import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {fonts} from '../../utils/fonts';

const NotesCard = ({chapterName = '', noteText = ''}) => {
  return (
    <View style={styles.notesCard}>
      <View style={styles.leftContainer}>
        <Text style={styles.titleText}>{chapterName}</Text>
        <Text style={styles.nameText}>{noteText.substring(0, 80) + '...'}</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.btnContainer}>
          <Image
            source={require('../../../assets/Images/download.webp')}
            style={styles.downloadImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notesCard: {
    width: '100%',
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  leftContainer: {
    width: '85%',
  },
  titleText: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: '#787878',
  },
  btnContainer: {
    width: 40,
    height: 40,
  },
  downloadImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  nameText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#000000',
  },
});

export default NotesCard;
