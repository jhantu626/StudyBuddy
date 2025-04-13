import {PermissionsAndroid, Platform} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

const requestPermission = async () => {
  if (Platform.OS === 'android') {
    const permission =
      Platform.Version >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const granted = await PermissionsAndroid.request(permission);
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
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
    .then(image =>
      setImage({uri: image.path, mime: image.mime, name: image.filename}),
    )
    .catch(err => {
      console.log(err);
      Toast.show({
        text1: 'No image selected',
        type: 'info',
      });
    });
};

export {requestPermission, pickImageAndCrop};
