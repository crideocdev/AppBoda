import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { globalStyles } from './DialogScreenStyles';
import { useNameStore } from '../../store/useNameStore';
import { useIntroStore } from '../../store/useIntroStore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../navigations/Navigation';
import { CustomAlert } from '../../components/ui/CustomAlert';

type NavigationProp = StackNavigationProp<RootStackParams, 'Dialog'>;

export const DialogScreen = () => {
  const [name, setName] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const { setNameShown } = useNameStore();
  const navigation = useNavigation<NavigationProp>();
  const { setIntroShown } = useIntroStore();

  const handleContinue = () => {
    setIntroShown();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const handleConfirm = () => {
    if (name.trim() === '') {
      Alert.alert('Por favor, introduce tu nombre.');
      return;
    }

    setNameShown(name);
    setShowAlert(true);
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

      {/*Aspecto de mejora que aparezca en el wellcome*/}
      {/* ALERTA PERSONALIZADA AQUÍ */}
      <CustomAlert
        visible={showAlert}
        message={name}
        onClose={() => {
          setShowAlert(false);
          handleContinue();
        }}
      />
    </View>
  );
};
