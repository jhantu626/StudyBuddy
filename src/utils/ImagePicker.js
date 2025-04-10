import {PermissionsAndroid, Platform} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

const requestPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return false;
};

const pickImageAndCrop = async ({setImage}) => {
  const hasPermission = await requestPermission();
  if (!hasPermission) {
    return;
  }
  ImageCropPicker.openPicker({
    width: 200,
    height: 200,
    cropping: true,
    mediaType: 'photo',
  })
    .then(image => setImage({uri: image.path}))
    .catch(err => {
      console.log(err);
      Toast.show({
        text1: 'Something went wrong',
        type: 'error',
      });
    });
};

export {requestPermission, pickImageAndCrop};
