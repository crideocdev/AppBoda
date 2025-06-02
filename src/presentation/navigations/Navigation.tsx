import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home/HomeScreen";
import WelcomeScreen  from "../screens/welcome/WelcomeScreen";
import { SlideShowScreen } from "../screens/slideshow/SlideShowScreen";
import { DialogScreen } from "../screens/dialog/DialogScreen";


export type RootStackParams = {
  Home: undefined;
  Welcome: undefined;
  Splash: undefined;
  SlideShow: undefined;
  Dialog: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Welcome"
      >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SlideShow" component={SlideShowScreen}/>
      <Stack.Screen name="Dialog" component={DialogScreen}/>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
