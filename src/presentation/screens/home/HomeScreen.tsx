import React from "react";
import { Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CarouselFold } from "../../components/ui/carousel/CarouselFold";
import { Gallery } from "../../components/ui/Gallery";
import { Separator } from "../../components/ui/Separator";
import { ButtonFixed } from "../../components/ui/ButtonFixed";
import styles from "./HomeScreenStyle";
import { ImageSelector } from "../../components/ui/ImageSelector";

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets(); //obtenemos el espacio de arriba de la pantalla

  const contador = 10;
  //pruebas para el scroll
  return (
    <>
      <ScrollView style={{ marginTop: top }}>
        <CarouselFold />
      </ScrollView>
        <Gallery />
      <ImageSelector/>
      <ButtonFixed
        icon={<Ionicons name="camera-outline" size={40} color="white" />}
        text=""
        position="center"
        style={{ bottom:50, borderRadius: 100, width: 90, height: 90 }}
        onPress={() => console.log("Tomar Foto")}
      />
      <Text
      style={styles.ContadorFotos}
      >{contador}</Text>
    </>
  );
};
