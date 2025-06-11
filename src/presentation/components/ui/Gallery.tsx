import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {RootStackParams} from '../../navigations/Navigation';
import { useNavigation } from '@react-navigation/native';
import { APP_FOLDER } from '../../../constants/paths';

const INTERNAL_DIR = FileSystem.documentDirectory + APP_FOLDER;

export const Gallery = () => {
  const [images, setImages] = useState<string[]>([]);
   const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
   
    

  const loadImages = async () => {
    try {
      const files = await FileSystem.readDirectoryAsync(INTERNAL_DIR);
      const imagePaths = files.map((filename) => INTERNAL_DIR + filename);
      setImages(imagePaths);
    } catch (error) {
      console.error('Error leyendo imágenes:', error);
    }
  };

   useEffect(() => {
       loadImages();
     }, []);

  const openViewer = (index: number) => {
    const imagesForViewer = images.map((uri) => ({ uri }));
    navigation.navigate('GalleryViewer',{
      images: imagesForViewer,
      index
    });
  };

  if (images.length === 0) {
    return <Text style={styles.emptyText}>No hay imágenes guardadas.</Text>;
  }

  return (
    <FlatList
      data={images}
      numColumns={5}
      keyExtractor={(item, index) => `${item}-${index}`}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() => openViewer(index)}
          activeOpacity={0.8}
        >
          <Image source={{ uri: item }} style={styles.image} />
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.imageGrid}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  imageGrid: {
    marginTop: -20,
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width / 5 - 12,
    height: Dimensions.get('window').width / 5 - 12,
    margin: 5,
    borderRadius: 10,
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    color: 'gray',
  },
});