import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {pick, types} from '@react-native-documents/picker';

const UploadInput = ({
  documentValue,
  setDocumentValue,
  labelText,
  isBg = false,
  minLength = 0,
  maxLength = 35,
  keyboardType = 'ascii-capable',
  bgColor = null,
}) => {
  const handleDocumentSelection = async () => {
    try {
      const result = await pick({
        type: [types.pdf, types.docx, types.doc, types.ppt, types.pptx],
      });
      setDocumentValue(result[0]);
    } catch (error) {}
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isBg && {backgroundColor: bgColor !== null ? bgColor + 20 : '#D6F6FA'},
        bgColor !== null && {borderColor: bgColor + 50},
      ]}
      onPress={handleDocumentSelection}>
      {/* <Animated.Text style={labelStyle}>{labelText}</Animated.Text> */}
      {documentValue ? (
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.label}>{documentValue.name}</Text>
          <Text style={[styles.label, {fontSize: 11, color: '#00000050'}]}>
            {documentValue.size / 1024}KB
          </Text>
        </View>
      ) : (
        <Text style={styles.label}>{labelText}</Text>
      )}
      <Image
        source={require('./../../../assets/Images/Upload.png')}
        style={styles.uploadImage}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: '#00000090',
  },
  uploadImage: {
    width: 24,
    height: 24,
  },
});

export default UploadInput;
