import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import Animated from "react-native-reanimated";


interface Props {
  image: any; 
  index: number;
  animationValue: Animated.SharedValue<number>;
  onPress:(index: number) => void;
}

export const CarouselItem: React.FC<Props> = ({ image, index, onPress }) => {

  return (
      <TouchableOpacity
        onPress={() => onPress(index)}
        style={styles.container}
        activeOpacity={0.8}
      >
        <Image source={image} style={styles.image} resizeMode="cover" />
        
      </TouchableOpacity>

  );
};

const { width, height } = Dimensions.get("window");

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
    borderRadius: 25,
  },
    modal: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImageContainer: {
    flex:1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: "100%",
    height: "80%",
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  closeButtonText: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 16,
  },
});
