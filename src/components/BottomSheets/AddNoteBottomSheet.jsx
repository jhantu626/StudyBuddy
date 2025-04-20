import React, {useMemo, useRef} from 'react';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {Text} from 'react-native';
import Backdrop from './Backdrop';

const AddNoteBottomSheet = ({
  bottomSheetRef,
  openCloseAnimationDuration = 300,
}) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={useMemo(() => ['60%'], [])}
      enablePanDownToClose
      enableOverDrag={false}
      backdropComponent={Backdrop}
      animationConfigs={{
        duration: openCloseAnimationDuration,
      }}>
      <BottomSheetScrollView>
        <Text>Helloworld</Text>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default AddNoteBottomSheet;
