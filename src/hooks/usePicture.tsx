import { useState } from 'react';
import {
  requestCameraPermission,
  requestGalleryPermission,
} from '../utils/permissions';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { apiService } from '../services/api';

export default function usePicture() {
  const [picture, setPicture] = useState<string | undefined>(undefined);

  const pickPicture = async () => {
    if (await requestGalleryPermission()) {
      launchImageLibrary({ mediaType: 'photo' }, (res: ImagePickerResponse) => {
        uploadImage(res);
      });
    }
  };

  const takePicture = async (): Promise<void> => {
    if (await requestCameraPermission()) {
      const res: ImagePickerResponse = await launchCamera({
        mediaType: 'photo',
        saveToPhotos: true,
      });
      uploadImage(res);
    }
  };

  const uploadImage = async (file: any): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiService.post<{ imageUrl: string }>(
        'upload/image',
        {
          formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      setPicture(response.imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return {
    setPicture,
    pickPicture,
    takePicture,
    picture,
  };
}
