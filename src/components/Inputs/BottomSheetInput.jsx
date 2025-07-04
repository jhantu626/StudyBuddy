import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {fonts} from '../../utils/fonts';

const BottomSheetInput = ({
  target = 'Class',
  selctedItems = [],
  setSelectedItems,
  bottomSheetOpen,
  setBottomSheetOpen,
  placeHolder,
  showProperty = 'name',
  borderColor = null,
}) => {
  const handleRemove = id => {
    setSelectedItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        selctedItems.length > 0 && {paddingVertical: 10},
        borderColor && {
          borderColor: borderColor,
        },
      ]}
      onPress={() => {
        setBottomSheetOpen({
          status: true,
          target: target,
        });
      }}>
      {selctedItems.length > 0 ? (
        <View style={styles.contentContainer} pointerEvents="box-none">
          {selctedItems.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.itemText} onPress={e => e.stopPropagation()}>
                {item[showProperty]}
              </Text>
              <TouchableOpacity
                onPress={e => {
                  e.stopPropagation();
                  handleRemove(item.id);
                }}>
                <Entypo name="cross" size={13} color={'#fff'} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.placeHolder}>{placeHolder}</Text>
      )}
      <Icon
        name={
          bottomSheetOpen?.status && bottomSheetOpen.target === target
            ? 'arrow-drop-up'
            : 'arrow-drop-down'
        }
        size={24}
        color={borderColor ? borderColor : colors.primary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 50,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
    flexGrow: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeHolder: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: '#9895AD',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  item: {
    backgroundColor: colors.primary,
    paddingHorizontal: 5,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  itemText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: '#ffffff',
  },
});

export default BottomSheetInput;
