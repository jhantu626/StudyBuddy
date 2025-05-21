import React, {useCallback, useMemo, useRef} from 'react';
import BottomSheet, {BottomSheetBackdrop, BottomSheetScrollView} from '@gorhom/bottom-sheet';
// import Backdrop from './Backdrop';

const AddNoteBottomSheet = ({
  bottomSheetRef,
  openCloseAnimationDuration = 300,
  childComponent,
}) => {
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
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={useMemo(() => ['70%'], [])}
      enablePanDownToClose
      enableOverDrag={false}
      backdropComponent={renderBackdrop}
      animationConfigs={{
        duration: openCloseAnimationDuration,
      }}
      >
      <BottomSheetScrollView>{childComponent}</BottomSheetScrollView>
    </BottomSheet>
  );
};

export default AddNoteBottomSheet;
