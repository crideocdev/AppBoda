import { StyleSheet } from "react-native";
import { colors } from "../../../../config/theme/theme";


const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: "#C5D3C0",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  topBar: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    color: "white",
    fontWeight: "bold",
  },
  contadorText: {
    color: "black",
    backgroundColor: colors.background,
    borderRadius: 50,
    width: 65,
    height:65,
    textAlign: "center",
    padding: 10,
    fontSize: 32,
    fontWeight: "bold",
  },
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  rotateButton: {
    position: "absolute",
    bottom: 44,
    right: 30,
  },alerta: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: "#ff4444cc",
    alignItems: "center",
    zIndex: 20,
  },
  alertaTexto: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  mensajeContainer: {
  position: "absolute",
  bottom: 50,
  alignSelf: "center",
  backgroundColor: "rgba(0,0,0,0.7)",
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 10,
},
mensajeTexto: {
  color: "white",
  fontSize: 16,
},
container2:{
  flex:1,
  justifyContent: "center",
  paddingVertical: 80,
   alignItems: "center"
}
 
});

export default styles;
