import React from 'react';
import { Pressable, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../../../config/theme/theme';
import { APP_FOLDER } from '../../../constants/paths';
import useContadorStore from '../../store/useContadorStore';
import { useNameStore } from '../../store/useNameStore';

const INTERNAL_DIR = FileSystem.documentDirectory + APP_FOLDER;

const subirImagenAGoogleDrive = async (uri: string, mimeType: string, name: string) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const body = {
      dataReq: {
        data: base64,
        name: name,
        type: mimeType,
      },
      fname: 'uploadFilesToGoogleDrive',
    };

    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbyqsFvKKdiBubPxr974D0gYJFyq3Dpjla09epHTYPi1cHobcUrnz1JFQdOlRsEC1194/exec',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    const result = await response.json();
    console.log('Subida exitosa:', result);
    return true;
  } catch (error) {
    console.error('Error al subir imagen:', error);
    return false;
  }
};

const getMimeType = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'heic':
      return 'image/heic';
    default:
      return 'application/octet-stream';
  }
};

export const ImageSelector = ({ onImageSaved }: { onImageSaved?: () => void }) => {
  const { contador, decrementar } = useContadorStore();
  const {nameShown}=useNameStore();

  const handleImagePickerPress = async () => {
    try {
      if (contador <= 0) {
        Alert.alert('Límite alcanzado', `No puedes subir más imágenes.`);
        return;
      }

      const dirInfo = await FileSystem.getInfoAsync(INTERNAL_DIR);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(INTERNAL_DIR, { intermediates: true });
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
        selectionLimit: contador,
        aspect: [1, 1],
      });

      if (!result.canceled && result.assets) {

        for (const asset of result.assets) {
          if (contador <= 0) break;

          const filename = asset.uri.split('/').pop() || `foto_${Date.now()}.jpg`;
          const mimeType = getMimeType(filename);
          const destPath = INTERNAL_DIR + filename;

          // Copiar localmente
          await FileSystem.copyAsync({
            from: asset.uri,
            to: destPath,
          });

          decrementar();
          onImageSaved?.();

          await subirImagenAGoogleDrive(destPath, mimeType, nameShown+filename);
        }

      }
    } catch (error) {
      console.error('Error seleccionando o subiendo imágenes:', error);
      Alert.alert('Error', 'Hubo un problema al subir las imágenes');
    }
  };

  return (
    <Pressable onPress={handleImagePickerPress} style={globalStyles.btnImagePicker}>
      <Ionicons name="attach-outline" size={30} color="white" />
    </Pressable>
  );
};
