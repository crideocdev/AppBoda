import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home/HomeScreen";
import WelcomeScreen from "../screens/welcome/WelcomeScreen";
import { SlideShowScreen } from "../screens/slideshow/SlideShowScreen";
import { DialogScreen } from "../screens/dialog/DialogScreen";
import { ImageGalleryScreen } from "../screens/ImageGalleryScreen/ImageGalleryScreen";
import { GalleryViewer } from "../components/ui/GalleryViewer";
import { useIntroStore } from "../store/useIntroStore";
import CameraCapture from "../components/ui/Camara/CamaraCapture";

export type RootStackParams = {
  Home: undefined;
  Welcome: undefined;
  Splash: undefined;
  SlideShow: undefined;
  Dialog: undefined;
  Gallery: undefined;
  GalleryViewer: { images: { uri: string }[]; index: number };
  CameraCapture: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
  const { introShown } = useIntroStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Welcome"
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />


      {!introShown ? (
        <>
          <Stack.Screen name="SlideShow" component={SlideShowScreen} />
          <Stack.Screen name="Dialog" component={DialogScreen} />
        </>
      ) : null}
      <Stack.Screen name="Home" component={HomeScreen} />


      <Stack.Screen name="Gallery" component={ImageGalleryScreen} />
      <Stack.Screen name="GalleryViewer" component={GalleryViewer} />
      <Stack.Screen name="CameraCapture" component={CameraCapture} />
    </Stack.Navigator>
  );
};
