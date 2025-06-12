// src/components/CustomAlert.tsx

import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type CustomAlertProps = {
  visible: boolean;
  message: string;
  onClose: () => void;
};

export const CustomAlert: React.FC<CustomAlertProps> = ({ visible, message, onClose }) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        <Text style={styles.alertTitle}>Nombre ingresado</Text>
        <Text style={styles.alertMessage}>{message}</Text>
        <TouchableOpacity style={styles.btn} onPress={onClose}>
          <Text style={styles.btnText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
