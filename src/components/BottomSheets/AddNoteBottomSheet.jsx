import React, {useMemo, useRef} from 'react';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {Text} from 'react-native';
import Backdrop from './Backdrop';

const AddNoteBottomSheet = ({
  bottomSheetRef,
  openCloseAnimationDuration = 300,
  childComponent,
}) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={useMemo(() => ['70%'], [])}
      enablePanDownToClose
      enableOverDrag={false}
      backdropComponent={Backdrop}
      animationConfigs={{
        duration: openCloseAnimationDuration,
      }}>
      <BottomSheetScrollView>{childComponent}</BottomSheetScrollView>
    </BottomSheet>
  );
};

export default AddNoteBottomSheet;
