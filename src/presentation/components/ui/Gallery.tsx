// src/screens/ImageGallery.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Text } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export const Gallery = () => {
  const [images, setImages] = useState<MediaLibrary.Asset[]>([]);
  const [permission, setPermission] = useState<boolean | null>(null);

  useEffect(() => {
    requestPermissionAndLoad();
  }, []);

  const requestPermissionAndLoad = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      setPermission(true);
      loadImagesFromAlbum();
    } else {
      setPermission(false);
    }
  };

  const loadImagesFromAlbum = async () => {
    try {
      const album = await MediaLibrary.getAlbumAsync('AppBoda');
      if (!album) {
        console.log('No se encontró el álbum AppBoda');
        return;
      }

      const assets = await MediaLibrary.getAssetsAsync({
        album: album,
        mediaType: 'photo',
        first: 100, // puedes ajustar este número
        sortBy: [['creationTime', false]], // más recientes primero
      });

      setImages(assets.assets);
    } catch (error) {
      console.error('Error al cargar imágenes del álbum:', error);
    }
  };

  if (permission === false) {
    return (
      <View style={styles.center}>
        <Text>Permiso para acceder a la galería denegado.</Text>
      </View>
    );
  }

  if (images.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No hay imágenes guardadas en AppBoda.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item.id}
      numColumns={3}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <Image source={{ uri: item.uri }} style={styles.image} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
