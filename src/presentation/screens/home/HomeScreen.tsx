import React, {useCallback, useState } from "react";
import { Text,ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CarouselFold } from "../../components/ui/carousel/CarouselFold";
import { Gallery } from "../../components/ui/Gallery";
import { ButtonFixed } from "../../components/ui/ButtonFixed";
import styles from "./HomeScreenStyle";
import { ImageSelector } from "../../components/ui/ImageSelector";
import { useEffect } from "react";
import * as FileSystem from "expo-file-system";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useContadorStore from "../../store/useContadorStore";
import { APP_FOLDER } from "../../../constants/paths";
import { RootStackParams } from "../../navigations/Navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFonts, GreatVibes_400Regular } from "@expo-google-fonts/great-vibes";
import { useNameStore } from "../../store/useNameStore";

const INTERNAL_DIR = FileSystem.documentDirectory + APP_FOLDER;
type NavigationProp = StackNavigationProp<RootStackParams, "CameraCapture">;

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets(); //obtenemos el espacio de arriba de la pantalla
  const [refreshGallery, setRefreshGallery] = useState(0);
  const { contador } = useContadorStore();
  const navigation = useNavigation<NavigationProp>();
  const {nameShown, setNameShown} = useNameStore();
  

   const [fontsLoaded] = useFonts({
    GreatVibes_400Regular,
  });


   const goToTakePicture = () => {
    navigation.navigate("CameraCapture");
  };

  const loadImageCount = async () => {
    try {
      const files = await FileSystem.readDirectoryAsync(INTERNAL_DIR);
    } catch (error) {
      console.error("Error leyendo imágenes:", error);
    }
  };

  useEffect(() => {
    loadImageCount();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setRefreshGallery((prev) => prev + 1);
    }, [])
  );

  //pruebas para el scroll
  return (
    <ImageBackground source={require("../../../../assets/backgroundApp.png")} style={[styles.container, { paddingTop: top }]} resizeMode="cover">
      <CarouselFold />
      <Text style={{marginTop:30,fontSize:54,fontFamily:"GreatVibes_400Regular"}}>Fotos</Text>
      <Gallery  key={refreshGallery} />
      <ImageSelector
        onImageSaved={() => {
          setRefreshGallery((prev) => prev + 1);
          loadImageCount();
        }}
      />
      <ButtonFixed
        icon={<Ionicons name="camera-outline" size={40} color="white" />}
        text=""
        position="center"
        style={{ bottom: 50, borderRadius: 100, width: 90, height: 90, marginLeft:10 }}
        onPress={() =>goToTakePicture() }
      />
      <Text style={styles.ContadorFotos}>{contador}</Text>
    </ImageBackground>
  );
};
