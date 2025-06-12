import React, { useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
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
import { useIntroStore } from "../../store/useIntroStore";
import { GreatVibes_400Regular, useFonts } from "@expo-google-fonts/great-vibes";

type NavigationProp = StackNavigationProp<RootStackParams, "Welcome">;
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT / 2;

export default function WelcomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const { introShown } = useIntroStore();

  const [fontsLoaded] = useFonts({
    GreatVibes_400Regular,
  });

  const goToHome = () => {
    introShown ? navigation.navigate("Home") : navigation.navigate("SlideShow");
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
    return {
      opacity: opacity.value,
    };
  });

  const swipeAnimatedStyle = useAnimatedStyle(() => {
    const swipeOpacity = interpolate(
      translateY.value,
      [0, MAX_TRANSLATE_Y],
      [1, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY: translateY.value }],
      opacity: swipeOpacity,
    };
  });

  useEffect(() => {
    if (fontsLoaded) {
      opacity.value = withTiming(1, { duration: 600 }); // Fade-in de 600ms
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: "white" }} />;
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { fontFamily: "GreatVibes_400Regular" }]}>
          {"Maria Isabel\n Y \n Antonio"}
        </Text>
      </View>

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.button, swipeAnimatedStyle]}>
          <AntDesign name="up" size={24} color="#000" />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}
