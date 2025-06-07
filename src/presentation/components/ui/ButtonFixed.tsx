
import React, { Component } from "react";
import { DimensionValue, Pressable, StyleProp, Text, View, ViewStyle } from "react-native";
import { globalStyles } from "../../../config/theme/theme";

interface Props{
    icon: React.ReactNode;
    text?: string;
    style?:StyleProp<ViewStyle>;
    position?:'left'|'center'|'right';

    onPress: () => void;
}


export const ButtonFixed = ({text,icon,position='left',onPress,style}:Props) => {

    const getPositionStyle = () => {
    switch (position) {
      case 'right':
        return { right: 20 };
      case 'center':
        return { left: '50%' as unknown as number,
        transform: [{ translateX: - 90 / 2 }]}; // Ajusta el -75 si el botón es más ancho
      case 'left':
      default:
        return { left: 20 };
    }
};

  return (
    <Pressable
      onPress={onPress}
      style={[globalStyles.btnFixed,getPositionStyle(),style]}
      >
        <View>
            {icon && <View>{icon}</View>}
            {text && <Text style={[globalStyles.btnFixedText]}>{text}</Text>}
        </View>
      </Pressable>
  );
}