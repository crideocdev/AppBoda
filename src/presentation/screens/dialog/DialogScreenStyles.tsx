import { StyleSheet } from 'react-native';
import { colors } from '../../../config/theme/theme';

export const globalStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backgroundSlide, // fondo claro moderno
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderColor: '#DADCE0',
    borderWidth: 1,
    fontSize: 16,
    color: '#333333',
    marginBottom: 25,
    elevation: 2, // para un pequeño sombreado en Android
    shadowColor: '#000', // sombreado iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  btnFixed: {
    width: '100%',
    backgroundColor: colors.primary, // azul moderno
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  btnFixedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
