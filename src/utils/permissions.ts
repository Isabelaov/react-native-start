import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {
  RESULTS,
  request,
  Permission,
  PermissionStatus,
  PERMISSIONS,
  openSettings,
} from 'react-native-permissions';

const CAMERA_PERMISSIONS_KEY = 'camera';
const GALLERY_PERMISSIONS_KEY = 'gallery';

const checkRequestPermissions = async (
  permission: Permission,
  storageKey: string,
): Promise<PermissionStatus> => {
  const storedPermission = await AsyncStorage.getItem(storageKey);

  console.log({storedPermission, storageKey});

  if (storedPermission === RESULTS.GRANTED) {
    return RESULTS.GRANTED;
  }

  const result: PermissionStatus = await request(permission);

  if (
    [
      RESULTS.GRANTED,
      RESULTS.DENIED,
      RESULTS.BLOCKED,
      RESULTS.UNAVAILABLE,
      RESULTS.LIMITED,
    ].includes(result)
  ) {
    await AsyncStorage.setItem(storageKey, result);
  }

  return result;
};

const handlePermissionResult = (result: PermissionStatus, type: string) => {
  if (result === RESULTS.GRANTED) {
    Alert.alert(`${type} permission granted`);
    return true;
  }

  Alert.alert(
    `${type} permission denied`,
    `To continue, please enable ${type.toLocaleLowerCase()} permissions in your app settings`,
    [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Open settings',
        onPress: () => openSettings(),
      },
    ],
  );

  Alert.alert(`${type} permission denied`);
  return false;
};

export const requestCameraPermission = async () => {
  const result = await checkRequestPermissions(
    PERMISSIONS.ANDROID.CAMERA,
    CAMERA_PERMISSIONS_KEY,
  );

  return handlePermissionResult(result, 'Camera');
};

export const requestGalleryPermission = async () => {
  const result = await checkRequestPermissions(
    PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    GALLERY_PERMISSIONS_KEY,
  );

  return handlePermissionResult(result, 'Gallery');
};
