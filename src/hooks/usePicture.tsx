import  { useState } from 'react'
import { requestCameraPermission, requestGalleryPermission } from '../utils/permissions'
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker'

export default function usePicture() {
    const [picture, setPicture] = useState<string | undefined>(undefined)

    const pickPicture = async () => {
        if(await requestGalleryPermission()){
          launchImageLibrary({ mediaType: 'photo' }, (res: ImagePickerResponse) => {
            setUri(res)
          })
        }
      }
  
      const takePicture = async () => {
        if(await requestCameraPermission()) {
          const res: ImagePickerResponse  = await launchCamera({ mediaType: 'photo', saveToPhotos: true })
          setUri(res)
        }
      }
  
      const setUri = (res: ImagePickerResponse) => {
        if (res.assets && res.assets.length > 0) {
          const uri = res.assets[0].uri;
          setPicture(uri);
        }
      }
  return {
    setPicture,
    pickPicture,
    takePicture,
    picture
  }
}