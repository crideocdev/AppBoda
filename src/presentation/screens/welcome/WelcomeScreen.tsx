import React from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../navigations/Navigation";
import { AntDesign } from "@expo/vector-icons";

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from "react-native-reanimated";

import styles from "./WelcomeScreenStyle";

type NavigationProp = StackNavigationProp<RootStackParams, "Welcome">;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT / 2; 

export default function WelcomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const translateY = useSharedValue(0);

  const goToHome = () => {
    navigation.navigate("SlideShow");
  };

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      if (event.translationY < 0) {
        translateY.value = Math.max(event.translationY, MAX_TRANSLATE_Y);
      }
    },
    onEnd: () => {
      if (translateY.value < -80) {
        runOnJS(goToHome)();
      } else {
        translateY.value = withTiming(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, MAX_TRANSLATE_Y],
      [1, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY: translateY.value }],
      opacity,
    };
  });

  return (
    <View
      
      style={styles.container}
     >
      <View style={styles.textContainer}>
        <Text style={styles.title}>Boda</Text>
      </View>

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.button, animatedStyle]}>
          <AntDesign name="up" size={24} color="#000" />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}
