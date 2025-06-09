import { StyleSheet } from "react-native";
import { colors } from "../../../config/theme/theme";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingVertical: 5,
    
  },
  ContadorFotos:{
    position: 'absolute',
    bottom: 20,
    fontSize: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  }
 
});

export default styles;
