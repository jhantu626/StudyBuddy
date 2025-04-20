import React, { useCallback } from 'react';
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

const Backdrop = useCallback(
  props => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.5}
    />
  ),
  [],
);

export default Backdrop;
