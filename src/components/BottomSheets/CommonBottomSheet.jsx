import {StyleSheet} from 'react-native';
import React, {memo, useCallback, useMemo} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

const CommonBottomSheet = ({
  Component,
  ref,
  snapPoints = ['50%'],
  duration = 300,
  enablePandownClose = true,
  enableOverDrag = false,
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
    [],
  );
  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={(useMemo(() => snapPoints), [])}
      enablePandownClose={enablePandownClose}
      enableOverDrag={enableOverDrag}
      backdropComponent={renderBackdrop}
      animationConfigs={{
        duration: duration,
      }}>
      <BottomSheetScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {Component}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};
export default memo(CommonBottomSheet);

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
});
