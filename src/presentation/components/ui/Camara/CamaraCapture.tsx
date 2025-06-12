import React, { useRef, useState, useEffect, use } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Button,
  Text,
  Animated,
} from "react-native";
import {
  CameraView,
  CameraType,
  CameraMode,
  useCameraPermissions,
} from "expo-camera";
import styles from "./CamaraCaptureStyle";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import { APP_FOLDER as carpeta } from "../../../../constants/paths";
import useContadorStore from "../../../store/useContadorStore";
import { useNameStore } from "../../../store/useNameStore";

const APP_FOLDER = carpeta;

export default function CameraCapture() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const navigation = useNavigation();
  const [uri, setUri] = useState<string | null>(null);
  const [mode] = useState<CameraMode>("picture");
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const { contador, decrementar } = useContadorStore();
  const {nameShown} = useNameStore();


  useEffect(() => {
    if (contador === 0) {
      setMostrarAlerta(true);
    } else {
      setMostrarAlerta(false);
    }
  }, [contador]);

  // Función para detectar MIME según extensión
  const obtenerMimeType = (filename: string): string => {
    const ext = filename.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      case "gif":
        return "image/gif";
      case "heic":
        return "image/heic";
      case "webp":
        return "image/webp";
      case "bmp":
        return "image/bmp";
      default:
        return "application/octet-stream";
    }
  };

  const takePicture = async () => {
    if (contador <= 0) return;

    try {
      const photo = await ref.current?.takePictureAsync();
      if (photo?.uri) {
        const savedUri = await savePhotoToFolder(photo.uri);
        setUri(savedUri);

        // Subir la foto automáticamente
        await subirFoto(savedUri, photo);
      }
    } catch (error) {
      console.error("Error al tomar o subir la foto:", error);

    }
  };

  const savePhotoToFolder = async (uri: string) => {
    const folderUri = FileSystem.documentDirectory + APP_FOLDER + "/";
    await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });

    const filename = uri.split("/").pop();
    const dest = folderUri + filename;
    decrementar();

    await FileSystem.moveAsync({
      from: uri,
      to: dest,
    });

    return dest;
  };

  const subirFoto = async (fileUri: string, photoData: any) => {
    try {
      const base64Data = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const nombreArchivo = photoData.uri.split("/").pop() || "photo.jpg";

      const mimeType = obtenerMimeType(nombreArchivo);

      const dataSend = {
        dataReq: {
          data: base64Data,
          name: nameShown +nombreArchivo,
          type: mimeType,
        },
        fname: "uploadFilesToGoogleDrive",
      };

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyqsFvKKdiBubPxr974D0gYJFyq3Dpjla09epHTYPi1cHobcUrnz1JFQdOlRsEC1194/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataSend),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error HTTP: ${response.status} - ${text}`);
      }

      const json = await response.json();
      console.log("Respuesta del servidor:", json);

      console.log("Foto subida exitosamente.");
    } catch (error: any) {
      console.error("Error al subir la foto:", error);
    }
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const renderCamera = () => {
    return (
      <>
        <View style={styles.topBar}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-outline"
              size={32}
              color="white"
              style={styles.backButton}
            />
          </Pressable>
          <Text style={styles.contadorText}>{contador}</Text>
        </View>
        {mostrarAlerta && (
          <View style={styles.alerta}>
            <Text style={styles.alertaTexto}>¡Has alcanzado el límite de fotos!</Text>
          </View>
        )}

        <CameraView style={styles.camera} ref={ref} facing={facing} mode={mode}>
          <View style={styles.shutterContainer}>
            <Pressable
              onPress={mode === "picture" ? takePicture : () => {}}
              style={({ pressed }) => [
                styles.shutterBtn,
                { opacity: pressed ? 0.6 : 1 },
              ]}
            >
              <View
                style={[
                  styles.shutterBtnInner,
                  { backgroundColor: mode === "picture" ? "white" : "red" },
                ]}
              />
            </Pressable>
          </View>

          <View style={styles.rotateButton}>
            <Pressable onPress={toggleFacing}>
              <Ionicons name="camera-reverse-outline" size={32} color="white" />
            </Pressable>
          </View>
        </CameraView>
      </>
    );
  };

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Necesitamos permisos para usar la cámara</Text>
        <Button title="Dar permiso" onPress={requestPermission} />
      </View>
    );
  }

  return <View style={styles.container}>{renderCamera()}</View>;
}
