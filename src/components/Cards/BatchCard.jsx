import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fonts} from '../../utils/fonts';
import BatchInputCard from './BatchInputCard';
import BatchInputCardMultivalueMultivalue from './BatchInputCardMultivalue';
import {convertTo12Hour} from '../../utils/helper';
import {months, monthsByKey} from '../../utils/data';
import {batchService} from '../../Services/BatchService';
import Toast from 'react-native-toast-message';
import CustomAlert from './CustomAlert';

const BatchCard = ({batch, authToken, reloadBatches}) => {
  const [isAlertVisible, setIsAlertVisible] = React.useState({
    status: false,
    position: {x: 0, y: 0},
  });
  const handleDelete = async () => {
    try {
      console.log('Deleting batch with id:', batch.id);
      const data = await batchService.deactivateBatch({
        authToken: authToken,
        batchId: batch.id,
      });
      console.log(data);

      if (data?.status) {
        Toast.show({
          type: 'success',
          text1: 'Batch Deleted Successfully',
        });
        reloadBatches();
      } else {
        Toast.show({
          type: 'error',
          text1: data?.message || 'Failed to delete batch',
        });
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.titleText}>{batch?.name}</Text>
        <View style={styles.btnCOntainer}>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={event => {
              console.log('Delete button pressed for batch:', batch?.id);
              setIsAlertVisible({
                status: true,
                position: {
                  x: event.nativeEvent.pageX,
                  y: event.nativeEvent.pageY,
                },
              });
            }}>
            <AntDesign name="delete" color={'#fff'} size={10} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editBtn}>
            <AntDesign name="edit" color={'#000'} size={10} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.inputs}>
          <View style={styles.childInputBox}>
            <BatchInputCard
              lable="Batch Session"
              value={
                batch?.startYear === batch?.endYear
                  ? `${monthsByKey[batch?.startMonth]} - ${
                      monthsByKey[batch?.endMonth]
                    }`
                  : `${batch?.startYear} - ${batch?.endYear}`
              }
            />
          </View>
          <View style={styles.childInputBox}>
            <BatchInputCard lable="Language" value={batch?.language?.name} />
          </View>
        </View>
        <BatchInputCardMultivalueMultivalue
          lable="Classes"
          values={batch?.classes}
        />
        <BatchInputCardMultivalueMultivalue
          lable="Subjects"
          values={batch?.subjects}
        />
        <View style={styles.inputs}>
          <View style={styles.childInputBox}>
            <BatchInputCard
              lable="Batch Timing"
              value={
                convertTo12Hour(batch?.startTime) +
                ' - ' +
                convertTo12Hour(batch?.endTime)
              }
            />
          </View>
          <View style={styles.childInputBox}>
            <BatchInputCard
              lable="Student Fees(Monthly)"
              value={batch?.monthlyFees}
            />
          </View>
        </View>
        <BatchInputCard
          lable="Batch Board"
          value={batch?.board?.name || 'N/A'}
        />
        <BatchInputCardMultivalueMultivalue
          lable="Day's"
          values={batch?.days.map((day, index) => ({id: index, name: day}))}
        />
        <BatchInputCard
          lable="Monthly Exam Fees"
          value={batch?.monthlyExamFees || 'N/A'}
        />
      </View>
      <CustomAlert
        closeOnOutsideClick={true}
        visible={isAlertVisible.status}
        startPosition={isAlertVisible.position}
        onCancel={() => {
          setIsAlertVisible({
            status: false,
          });
        }}
        onDelete={handleDelete}
        text1={'Delete Batch'}
        text2={'Are you sure you want to delete this batch?'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#00000050',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  topContainer: {
    height: 40,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  btnCOntainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  deleteBtn: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBtn: {
    backgroundColor: '#fff',
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 17,
    fontFamily: fonts.semiBold,
    color: '#fff',
  },
  bottomContainer: {
    padding: 20,
    gap: 10,
  },
  inputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  childInputBox: {
    width: '48%',
  },
});

export default BatchCard;
