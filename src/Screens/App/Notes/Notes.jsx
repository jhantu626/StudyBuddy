import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import Layout from '../Layout/Layout';
import MainHeader from '../../../components/Headers/MainHeader';
import {AddNoteBottomSheet, AddNotes, NotesCard} from '../../../components';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {notes} from '../../../utils/data';

const Notes = () => {
  const values = ['Class X', 'Class XI', 'Class XII', 'Class IX'];
  const [selectedValue, setSelectedValue] = useState(values[0]);
  const [isSubBottomSheetOpen, setIsSubBottomSheetOpen] = useState({
    status: false,
    target: null,
  });

  // For Bottomsheet
  const bottomSheetRef = useRef(null);
  const handleOpen = () => {
    bottomSheetRef.current.snapToIndex(1);
  };

  return (
    <Layout>
      <GestureHandlerRootView>
        <MainHeader
          title="Notes"
          isBackable={false}
          values={values}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={styles.containerStyle}
          showsVerticalScrollIndicator={false}>
          {notes.map((item, index) => (
            <NotesCard
              chapterName={item.chapter}
              noteText={item.title}
              key={index + 'notes-title'}
            />
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.floatingBtn} onPress={handleOpen}>
          <Text style={styles.btnText}>ADD NOTES</Text>
        </TouchableOpacity>
        <AddNoteBottomSheet
          bottomSheetRef={bottomSheetRef}
          openCloseAnimationDuration={400}
          childComponent={
            <AddNotes
              isBottomSheetOpen={isSubBottomSheetOpen}
              setIsBottomSheetOpen={setIsSubBottomSheetOpen}
            />
          }
        />
      </GestureHandlerRootView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 10,
    marginVertical: 10,
    paddingBottom: 30,
    gap: 12,
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

export default Notes;
