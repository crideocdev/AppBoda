import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  image: any; 
  index: number;
  animationValue: Animated.SharedValue<number>;
}

/*la idea es cargar el nombre del lugar en la imagen con un icono de flecha direccional.
Al pulsar en la imagen se monstrara al detalle el lugar.
*/


export const CarouselItem: React.FC<Props> = ({ image, index }) => {
  return (
    <TouchableOpacity
      onPress={() => console.log("Clicked", index)}
      style={styles.container}
    >
      <Image source={image} style={styles.image} resizeMode="cover" />
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginHorizontal: 10,
    
  },
  image: {
    width: "100%",
    height: "100%",
    
  }
});
