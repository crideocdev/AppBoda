import {
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { FlatList } from "react-native-gesture-handler";
import { Button } from "../../components/ui/Button";
import { useRef, useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigations/Navigation";
import { colors } from "../../../config/theme/theme";
import { useIntroStore } from "../../store/useIntroStore";

type NavigationProp = StackNavigationProp<RootStackParams, "SlideShow">;

interface Slide {
  title: string;
  desc: string;
  img: ImageSourcePropType;
}

const items: Slide[] = [
  {
    title: "Titulo 1",
    desc: "¡Bienvenidos a nuestra app de bodas! En los próximos pasos, os explicaremos cómo funciona esta maravillosa cámara desechable de fotos. \n\n ¡Gracias por ser parte de este día tan especial!",
    img: require("../../../../assets/pht01.png"),
  },
  {
    title: "Titulo 2",
    desc: "Como una auténtica cámara desechable, esta aplicación os brinda 10 oportunidades únicas e irrepetibles para capturar un momento. Así que prestad mucha atención... cada foto cuenta, y no podréis repetirla. ",
    img: require("../../../../assets/pht02.png"),
  },
  {
    title: "Titulo 3",
    desc: " ¡Muchísima suerte en este maravilloso e inaudito reportaje! Gracias por ayudarnos a guardar recuerdos inolvidables. ",
    img: require("../../../../assets/pht02.png"),
  },
];

export const SlideShowScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<NavigationProp>();
  const {setIntroShown} = useIntroStore();

  //Para saltar una vez visto
  const handleContinue = () => {
    setIntroShown();
    navigation.reset({
      index: 0,
     routes:[{name:"Home"}]
    });
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const currentIndex = Math.floor(contentOffset.x / layoutMeasurement.width);

    /* console.log({currentIndex}); */

    setCurrentSlideIndex(currentIndex > 0 ? currentIndex : 0);
  };

  const scrollToSlide = (index: number) => {
    if (!flatListRef.current) return;

    flatListRef.current.scrollToIndex({
      index: index,
      animated: true,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.backgroundSlide,
      }}
    >
      <FlatList
        style={{ backgroundColor: colors.background }}
        ref={flatListRef}
        data={items}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        //scrollEnabled={false}

        onScroll={onScroll}
      />

      {currentSlideIndex === items.length - 1 ? (
        <Button
          text="Finalizar"
          styles={{ position: "absolute", bottom: 60, right: 30, width: 100 }}
          onPress={handleContinue}
        />
      ) : (
        <Button
          text="Siguiente"
          styles={{ position: "absolute", bottom: 60, right: 30, width: 100 }}
          onPress={() => scrollToSlide(currentSlideIndex + 1)}
        />
      )}
    </View>
  );
};

interface SlideItemProps {
  item: Slide;
}

const SlideItem = ({ item }: SlideItemProps) => {
  const { width } = useWindowDimensions();
  const { title, desc, img } = item;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor:"#A8C79F" ,
        borderRadius: 5,
        justifyContent: "center",
        width: width,
      }}
    >
      <Image
        source={img}
        style={{
          width: width * 0.7,
          height: width * 0.7,
          resizeMode: "center",
          alignSelf: "center",
          
        }}
      />
      <View
        style={{ borderRadius: 10, backgroundColor: colors.cardBackground }}
      >
        <Text
          style={{
            margin: 20,
            fontSize: 23,
            textAlign: "center",
          }}
        >
          {desc}
        </Text>
      </View>
    </View>
  );
};
