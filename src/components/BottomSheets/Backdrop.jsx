import React, {useCallback} from 'react';
import {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

const Backdrop = () => (
  <BottomSheetBackdrop
    disappearsOnIndex={-1}
    appearsOnIndex={0}
    opacity={0.5}
  />
);

export default Backdrop;
