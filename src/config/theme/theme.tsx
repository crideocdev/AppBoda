import { StyleSheet } from "react-native";

export interface ThemeColors {
  primary: string;
  secundary: string;
  text: string;
  background: string;
  cardBackground: string;
  buttonTextColor: string;
  backgroundSlide: string;
}

export const colors: ThemeColors = {
  primary: "#66845E",
  secundary: "#415564",
  text: "black",
  backgroundSlide:"#A8C79F", 

  background: "#C5D3C0",
  cardBackground: "white",
  buttonTextColor: "white",
 
};



export const globalStyles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    // color: colors.text,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    // color: colors.text,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
    // color: colors.text,
  },

  mainContainer: {
    flex: 1,
    // backgroundColor: colors.background,
  },
  globalMargin: {
    paddingHorizontal: 20,
    flex: 1,
  },

  btnPrimary: {
    // backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  btnPrimaryText: {
    // color: colors.text,
    fontSize: 16,
  },
   btnFixed: {
    position: 'absolute',
    bottom: 20,
    width: 60,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5, // Android
    shadowColor: '#000', // iOS
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
   btnImagePicker: {
    position: 'absolute',
    bottom: 20,
    width: 60,
    right: 20,
    backgroundColor: colors.secundary,
    paddingVertical: 10,
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5, // Android
    shadowColor: '#000', // iOS
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  btnFixedContent: {
    alignItems: 'center',
  },
  
  btnFixedText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});