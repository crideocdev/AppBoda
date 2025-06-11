import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Button,
  Text,
} from "react-native";
import {
  CameraView,
  CameraType,
  CameraMode,
  useCameraPermissions,
} from "expo-camera";
import styles from "./CamaraCaptureStyle";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import { APP_FOLDER as carpeta } from "../../../../constants/paths";
import useContadorStore from "../../../store/useContadorStore";
import { Ionicons } from "@expo/vector-icons";

const APP_FOLDER = carpeta;

export default function CameraCapture() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const navigation = useNavigation();
  const [uri, setUri] = useState<string | null>(null);
  const [mode] = useState<CameraMode>("picture");
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const {contador,decrementar} = useContadorStore();

  useEffect(() => {
    if (contador === 0) {
      setMostrarAlerta(true);
    } else {
      setMostrarAlerta(false);
    }
  }, [contador]);

  const takePicture = async () => {
    //Comprobamos si el contador es 0
    if (contador <= 0) return;

    const photo = await ref.current?.takePictureAsync();
    if (photo?.uri) {
      const savedUri = await savePhotoToFolder(photo.uri);
      setUri(savedUri);
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

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const renderCamera = () => {
    return (
      <>
        <View style={styles.topBar}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={32} color="white" style={styles.backButton}/>
          </Pressable>
          <Text style={styles.contadorText}>{contador}</Text>
        </View>
        {mostrarAlerta && (
          <View style={styles.alerta}>
            <Text style={styles.alertaTexto}>¡Has alcanzado el límite de fotos!</Text>
          </View>
        )}

        <CameraView
          style={styles.camera}
          ref={ref}
          facing={facing}
          mode={mode}
        >
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


