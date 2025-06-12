import React from 'react';
import { Button, View, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const guardarArchivo = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      console.log('Respuesta DocumentPicker:', res);

      if (!res.canceled && res.assets && res.assets.length > 0) {
        const file = res.assets[0];

        console.log('Archivo seleccionado:', file);

        // Leer archivo como base64 usando FileSystem
        const base64Data = await FileSystem.readAsStringAsync(file.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        console.log('Tamaño base64:', base64Data.length);

        const dataSend = {
          dataReq: {
            data: base64Data,
            name: file.name,
            type: file.mimeType || 'application/octet-stream',
          },
          fname: 'uploadFilesToGoogleDrive',
        };

        console.log('Datos a enviar:', dataSend);

        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbyqsFvKKdiBubPxr974D0gYJFyq3Dpjla09epHTYPi1cHobcUrnz1JFQdOlRsEC1194/exec',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataSend),
          }
        );

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
        }

        const json = await response.json();
        console.log('Respuesta backend:', json);
        Alert.alert('Archivo enviado', JSON.stringify(json));
      } else {
        Alert.alert('Cancelado');
      }
    } catch (error) {
      console.error('Error en guardarArchivo:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Seleccionar archivo y subir" onPress={guardarArchivo} />
    </View>
  );
}
