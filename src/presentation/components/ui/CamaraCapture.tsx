import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import type { Camera as CameraTypeRef } from 'expo-camera'; // ✅ tipo correcto

const FOLDER_NAME = 'Appbod';

export default function CameraCapture() {
  const cameraRef = useRef<CameraTypeRef>(null); // ✅ referencia con tipo correcto
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted' && mediaStatus === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      const photo = await cameraRef.current.takePictureAsync();
      savePhoto(photo.uri);
    }
  };

  const savePhoto = async (uri: string) => {
    try {
      const dirInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + FOLDER_NAME);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + FOLDER_NAME, {
          intermediates: true,
        });
      }

      const fileName = `photo_${Date.now()}.jpg`;
      const newPath = FileSystem.documentDirectory + FOLDER_NAME + '/' + fileName;

      await FileSystem.moveAsync({
        from: uri,
        to: newPath,
      });

      await MediaLibrary.saveToLibraryAsync(newPath);
      Alert.alert('Foto guardada en:', newPath);
    } catch (error) {
      console.error('Error guardando la foto:', error);
      Alert.alert('Error al guardar la foto');
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permisos...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No tienes permisos para usar la cámara.</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={cameraRef}
        onCameraReady={() => setIsCameraReady(true)}
        type={CameraType.back}
      />
      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <Text style={styles.buttonText}>📸 Capturar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  button: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#C5D3C0',
    padding: 15,
    borderRadius: 50,
  },
  buttonText: { fontSize: 18, color: 'white' },
});
