import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import Carousel, { TAnimationStyle } from "react-native-reanimated-carousel";
import Animated, { interpolate, Extrapolation } from "react-native-reanimated";
import { CarouselItem } from "./CarouselItem";
import { getImages } from "../../../utils/get-images";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigations/Navigation";


const PAGE_WIDTH = Dimensions.get("window").width;
const PAGE_HEIGHT = Dimensions.get("window").height;

export const CarouselFold = () => {
  const itemSize = PAGE_WIDTH * 0.7;
  const centerOffset = PAGE_WIDTH / 2 - itemSize / 2;
  const sideItemCount = 6;
  const sideItemWidth = PAGE_WIDTH - itemSize;

  const data = getImages(8);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const openViewer = (index: number) => {
    const imagesForViewer = data.map((img) =>
      typeof img === "number"
        ? { uri: Image.resolveAssetSource(img).uri }
        : { uri: img.uri }
    );

    navigation.navigate("GalleryViewer", {
      images: imagesForViewer,
      index: index,
    });
  };

  const animationStyle: TAnimationStyle = React.useCallback(
    (value: number) => {
      "worklet";

      const itemOffsetInput = new Array(sideItemCount * 2 + 1)
        .fill(null)
        .map((_, index) => index - sideItemCount);

      const itemOffset = interpolate(
        value,
        itemOffsetInput,
        itemOffsetInput.map((item) => {
          if (item < 0) {
            return (-itemSize + sideItemWidth) * Math.abs(item);
          }
          if (item > 0) {
            return (itemSize - sideItemWidth) * (Math.abs(item) - 1);
          }
          return 0;
        }) as number[]
      );

      const translateX =
        interpolate(value, [-1, 0, 1], [-itemSize, 0, itemSize]) +
        centerOffset -
        itemOffset;

      const translateY = interpolate(value, [-1, 0, 1], [20, 0, 20], Extrapolation.CLAMP);

      const opacity = interpolate(value, [-1, 0, 1], [1, 1, 1], Extrapolation.CLAMP);
      const width = interpolate(
        value,
        [-1, 0, 1],
        [sideItemWidth, itemSize, sideItemWidth],
        Extrapolation.CLAMP
      );

      return {
        transform: [{ translateX }, { translateY }],
        width,
        opacity,
        overflow: "hidden",
      };
    },
    [centerOffset, itemSize, sideItemWidth, sideItemCount]
  );

  return (
    <View style={styles.container}>
      <Carousel
        width={PAGE_WIDTH}
        height={PAGE_HEIGHT / 2}
        style={styles.carousel}
        loop
        windowSize={Math.round(data.length / 2)}
        scrollAnimationDuration={1500}
        autoPlayInterval={1200}
        data={data}
        renderItem={({ item, index, animationValue }) => (
          <CarouselItem
            image={item}
            index={index}
            animationValue={animationValue}
            onPress={openViewer}
          />
        )}
        customAnimation={animationStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT / 2,
    marginBottom: 0,
  },
  carousel: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
  },
});
