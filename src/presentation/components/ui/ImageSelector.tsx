// src/components/ImageSelectorButton.tsx
import React from 'react';
import { Pressable, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../../../config/theme/theme';
import { APP_FOLDER } from '../../../constants/paths';
import useContadorStore from '../../store/useContadorStore';

const INTERNAL_DIR = FileSystem.documentDirectory + APP_FOLDER;
const MAX_IMAGES = 10;

export const ImageSelector = ({ onImageSaved }: { onImageSaved?: () => void }) => {
  const { contador, setContador,decrementar } = useContadorStore();
  const handleImagePickerPress = async () => {
  try {
      // Comprobar si la carpeta existe
      const dirInfo = await FileSystem.getInfoAsync(INTERNAL_DIR);
      if (!dirInfo.exists) {
        // Crear la carpeta si no existe
        await FileSystem.makeDirectoryAsync(INTERNAL_DIR, { intermediates: true });
      }
    } catch (error) {
      console.error('Error al crear la carpeta:', error);
    }

    try {
      // Leer la carpeta para saber cuántas imágenes ya hay
      const files = await FileSystem.readDirectoryAsync(INTERNAL_DIR);
      const currentCount = files.length;

      if (currentCount >= MAX_IMAGES) {
        Alert.alert('Límite alcanzado', `Ya tienes ${MAX_IMAGES} imágenes guardadas.`);
        return;
      }

      const maxSelectable = MAX_IMAGES - currentCount;
      console.log(maxSelectable);
      

      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permiso denegado', 'Se necesita acceso a la galería');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
        selectionLimit: maxSelectable,  // limitar selección según lo que falta
        aspect: [1, 1],
      });

      if (!result.canceled) {
        await FileSystem.makeDirectoryAsync(INTERNAL_DIR, { intermediates: true });

        for (const asset of result.assets) {
          const filename = asset.uri.split('/').pop();
          const newPath = INTERNAL_DIR + filename;
          decrementar();
          await FileSystem.copyAsync({
            from: asset.uri,
            to: newPath,
          });
        }

        Alert.alert('Imágenes guardadas', 'Las imágenes se han almacenado correctamente');
      }
      onImageSaved?.();
    } catch (error) {
      console.error('Error guardando imágenes:', error);
      Alert.alert('Error', 'No se pudo guardar las imágenes');
    }
  };

  return (
    <Pressable onPress={handleImagePickerPress} style={globalStyles.btnImagePicker}>
      <Ionicons name="attach-outline" size={30} color="white" />
    </Pressable>
  );
};