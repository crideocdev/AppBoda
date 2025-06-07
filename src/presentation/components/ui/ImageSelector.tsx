// src/components/ImageSelector.tsx
import React, { useState } from 'react';
import {
  View,
  Alert,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../../../config/theme/theme';

const MAX_IMAGES = 3;
const INTERNAL_DIR = FileSystem.documentDirectory + 'my_images/';

export const ImageSelector = () => {
  const [images, setImages] = useState<string[]>([]);

  const pickImages = async () => {
    if (images.length >= MAX_IMAGES) {
      Alert.alert('Límite alcanzado', `Máximo de ${MAX_IMAGES} imágenes`);
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: MAX_IMAGES - images.length,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const newImageUris: string[] = [];

      for (const asset of result.assets) {
        const filename = asset.uri.split('/').pop();
        const newPath = INTERNAL_DIR + filename;

        try {
          await FileSystem.makeDirectoryAsync(INTERNAL_DIR, {
            intermediates: true,
          });

          await FileSystem.copyAsync({
            from: asset.uri,
            to: newPath,
          });

          newImageUris.push(newPath);
        } catch (error) {
          console.error('Error copiando imagen:', error);
        }
      }

      setImages((prev) => [...prev, ...newImageUris]);
    }
  };

  return (
    <View>
      <Pressable onPress={pickImages} style={globalStyles.btnImagePicker}>
        <Ionicons name="attach-outline" size={30} color="white" />
      </Pressable>

      <ScrollView horizontal contentContainerStyle={styles.imageRow}>
        {images.map((uri, index) => (
          <Image
            key={index}
            source={{ uri }}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
});
