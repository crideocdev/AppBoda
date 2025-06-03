import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Carousel, { TAnimationStyle } from "react-native-reanimated-carousel";
import Animated, { Extrapolation, interpolate } from "react-native-reanimated";
import { CarouselItem } from "./CarouselItem";
import { getImages } from "../../../utils/get-images";

const PAGE_WIDTH = Dimensions.get("window").width;
const PAGE_HEIGHT = Dimensions.get("window").height;


export const CarouselFold = () => {
  const itemSize = PAGE_WIDTH * 0.7;
  const centerOffset = PAGE_WIDTH / 2 - itemSize / 2;
  const sideItemCount = 6;
  const sideItemWidth = (PAGE_WIDTH - itemSize);
  const data = getImages(4);

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

      const translateY = interpolate(
        value,
        [-1,0,1],
        [20,0,20],
        Extrapolation.CLAMP
      );

      //modificar la opcidad de los 3 componentes que se ven
      const opacity = interpolate(
        value,
        [-1, 0, 1],
        [1, 1, 1],
        Extrapolation.CLAMP
      )
      const width = interpolate(
        value,
        [-1, 0, 1],
        [sideItemWidth, itemSize, sideItemWidth],
        Extrapolation.CLAMP
      );

      return {
        transform: [{ translateX: translateX}, { translateY: translateY }],
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
        height={PAGE_HEIGHT/2}
        style={styles.carousel}
        loop
        windowSize={Math.round(data.length / 2)}
        scrollAnimationDuration={1500}
        autoPlayInterval={1200}
        data={data}
        renderItem={({ item, index, animationValue }) => (
          <CarouselItem image={item} index={index} animationValue={animationValue} />
        )}
        customAnimation={animationStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT/2,
    marginBottom: 0
    
  },
  carousel: {
    width: PAGE_WIDTH,
    height:PAGE_HEIGHT,
  },
});
