import React from "react";
import { View, StyleSheet } from "react-native";
import ImageViewing from "react-native-image-viewing";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigations/Navigation";

type GalleryRouteProp = RouteProp<RootStackParams, "Gallery">;

export const ImageGalleryScreen = () => {
  const route = useRoute<GalleryRouteProp>();
  const navigation = useNavigation();

  if(!route.params) return null;
  const { images, index } = route.params;

  return (
    <View style={styles.container}>
      <ImageViewing
        images={images}
        imageIndex={index}
        visible={true}
        onRequestClose={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
