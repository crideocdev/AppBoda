import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export const HomeScreen = () => {
  const { top } = useSafeAreaInsets(); //obtenemos el espacio de arriba de la pantalla

  return (
   <View>
    <Text>HomeScreen</Text>
   </View>
  );
};
