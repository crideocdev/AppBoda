import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { globalStyles } from '../../../config/theme/theme';
import { useNameStore } from '../../store/useNameStore';
import { useIntroStore } from "../../store/useIntroStore";
import { NavigationContainerProps, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../navigations/Navigation';

type NavigationProp = StackNavigationProp<RootStackParams, "Dialog">;

export const DialogScreen = () => {
  const [name, setName] = useState('');

  const {nameShown, setNameShown} = useNameStore();
  const navigation = useNavigation<NavigationProp>();
    const {setIntroShown} = useIntroStore();
  
   const handleContinue = () => {
    setIntroShown();
    navigation.reset({
      index: 0,
     routes:[{name:"Home"}]
    });
  };

  const handleConfirm = () => {
    if (name.trim() === '') {
      Alert.alert('Por favor, introduce tu nombre.');
      return;
    }

    setNameShown(name);

    // Aquí podrías guardar el nombre o navegar
    Alert.alert('Nombre ingresado:', name);

    handleContinue();



  };

  return (
    <View style={globalStyles.mainContainer}>
      <Text style={globalStyles.title}>¿Cómo te llamas?</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Escribe tu nombre"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={globalStyles.btnFixed} onPress={handleConfirm}>
        <Text style={globalStyles.btnFixedText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
};

