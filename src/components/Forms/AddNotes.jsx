import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fonts} from '../../utils/fonts';
import BottomSheetInput from '../Inputs/BottomSheetInput';
import DefaultInput from '../Inputs/DefaultInput';
import UploadInput from '../Inputs/UploadInput';
import {colors} from '../../utils/colors';

const AddNotes = ({isBottomSheetOpen, setIsBottomSheetOpen}) => {
  const [noteDocument, setNoteDocument] = useState(null);
  useEffect(() => {
    console.log('isBottomSheetOpen', isBottomSheetOpen);
  }, [isBottomSheetOpen]);
  return (
    <View style={styles.container}>
      <Text style={styles.titleLabel}>AddNotes</Text>
      <View style={styles.formContainer}>
        <BottomSheetInput
          placeHolder={'Select Class'}
          target="class"
          bottomSheetOpen={isBottomSheetOpen}
          setBottomSheetOpen={setIsBottomSheetOpen}
        />
        <BottomSheetInput
          placeHolder={'Select Subject'}
          target="subject"
          bottomSheetOpen={isBottomSheetOpen}
          setBottomSheetOpen={setIsBottomSheetOpen}
        />
        <BottomSheetInput
          placeHolder={'Select Board'}
          target="board"
          bottomSheetOpen={isBottomSheetOpen}
          setBottomSheetOpen={setIsBottomSheetOpen}
        />
        <DefaultInput labelText={'Enter Note Title'} />
        <DefaultInput labelText={'Description of Notes'} />
        <UploadInput
          labelText={'Upload files (pdf, doc file)'}
          documentValue={noteDocument}
          setDocumentValue={setNoteDocument}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[
            styles.btn,
            {
              backgroundColor: '#FF0000',
            },
          ]}>
          <Text style={[styles.btnText]}>CACNCEL</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>ADD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
  },
  titleLabel: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: '#6812D6',
  },
  formContainer: {
    width: '100%',
    marginTop: 10,
    gap: 15,
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 15,
  },
  btn: {
    paddingVertical: 10,
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: colors.floatingBtnColor,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: fonts.medium,
  },
});

export default AddNotes;
