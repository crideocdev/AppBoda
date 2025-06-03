import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CarouselFold } from "../../components/ui/carousel/CarouselFold";


export const HomeScreen = () => {
  const { top } = useSafeAreaInsets(); //obtenemos el espacio de arriba de la pantalla

  return (
   <View>
    <CarouselFold/>
   </View>
  );
};
