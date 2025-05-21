import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Layout from '../Layout/Layout';
import MainHeader from '../../../components/Headers/MainHeader';
import {
  AddNoteBottomSheet,
  AddNotes,
  AuthSelection,
  NotesCard,
} from '../../../components';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {notes} from '../../../utils/data';
import {teacherService} from '../../../Services/TeacherService';
import {useAuth} from '../../../Contexts/AuthContext';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

const Notes = () => {
  const {authToken} = useAuth();
  const values = ['Class X', 'Class XI', 'Class XII', 'Class IX'];
  const [selectedValue, setSelectedValue] = useState(values[0]);
  const [isSubBottomSheetOpen, setIsSubBottomSheetOpen] = useState({
    status: false,
    target: null,
  });

  const [selectedClass, setSelectedClass] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [noteDocument, setNoteDocument] = useState(null);
  const [noteTitle, setNoteTitle] = useState(null);
  const [noteDescription, setNoteDescription] = useState(null);

  // Options for the bottom sheet
  const [classOptions, setClassOptions] = useState([]);
  const [boardOptions, setBoardOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  // For Bottomsheet
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['70%'], []);
  const subBottomSheetRef = useRef(null);
  const handleOpen = async () => {
    bottomSheetRef.current.snapToIndex(1);
    const classes = await teacherService.getAllClasses({authToken: authToken});
    const subjects = await teacherService.getAllSubjects({
      authToken: authToken,
    });
    const boards = await teacherService.getAllBoards({
      authToken: authToken,
    });
    setClassOptions(classes);
    setSubjectOptions(subjects);
    setBoardOptions(boards);
  };

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  const renderSubBottomSheet = useCallback(() => {
    switch (isSubBottomSheetOpen.target) {
      case 'class':
        return (
          <AuthSelection
            key={'class-selection'}
            options={classOptions}
            selectedItems={selectedClass}
            setSelectedItems={setSelectedClass}
          />
        );
      case 'board':
        return (
          <AuthSelection
            key={'board-selection'}
            options={boardOptions}
            selectedItems={selectedBoard}
            setSelectedItems={setSelectedBoard}
          />
        );
      case 'subject':
        return (
          <AuthSelection
            key={'subject-selection'}
            options={subjectOptions}
            selectedItems={selectedSubject}
            setSelectedItems={setSelectedSubject}
          />
        );
      default:
        return null;
    }
  }, [isSubBottomSheetOpen.target, classOptions, boardOptions, subjectOptions]);

  useEffect(() => {
    if (isSubBottomSheetOpen.status) {
      subBottomSheetRef.current?.snapToIndex(1);
    }
  }, [isSubBottomSheetOpen]);
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
              noteDocument={noteDocument}
              setNoteDocument={setNoteDocument}
              selectedBoard={selectedBoard}
              setSelectedBoard={setSelectedBoard}
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              noteTitle={noteTitle}
              setNoteTitle={setNoteTitle}
              noteDescription={noteDescription}
              setNoteDescription={setNoteDescription}
            />
          }
        />
        <BottomSheet
          ref={subBottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          enablePanDownToClose={true}
          onChange={index => {
            if (index === -1) {
              setIsSubBottomSheetOpen({status: false, target: null});
            }
          }}>
          <BottomSheetScrollView>
            {renderSubBottomSheet()}
          </BottomSheetScrollView>
        </BottomSheet>
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
