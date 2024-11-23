import { useEffect, useState } from 'react';
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
import { Picture } from '../interfaces';

export default function usePicture() {
  const [picture, setPicture] = useState<Picture | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const pickPicture = async () => {
    if (await requestGalleryPermission()) {
      const result: ImagePickerResponse = await launchImageLibrary({
        mediaType: 'photo',
      });

      takeUri(result);
    }
  };

  const takePicture = async (): Promise<void> => {
    if (await requestCameraPermission()) {
      const res: ImagePickerResponse = await launchCamera({
        mediaType: 'photo',
        saveToPhotos: true,
      });
      takeUri(res);
    }
  };

  const takeUri = (result: ImagePickerResponse) => {
    if (result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      console.log({ asset });

      if (asset.uri) {
        console.log(asset.uri);

        setPicture({
          uri: asset.uri,
          fileName: asset.fileName,
          type: asset.type,
        });
      }
    }
  };

  const uploadImage = async (file: {
    uri: string;
    fileName?: string;
    type?: string;
  }): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        name: file.fileName || 'unknown.jpg',
        type: file.type || 'image/jpeg',
      });

      const response = await apiService.post<{ imageUrl: string }>(
        'upload/image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      setUrl(response.imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return {
    setPicture,
    pickPicture,
    takePicture,
    setUrl,
    picture,
    url,
  };
}
