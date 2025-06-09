// src/screens/GalleryViewer.tsx
import React from 'react';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import ImageViewing from 'react-native-image-viewing';
import { RootStackParams } from '../../navigations/Navigation';

export const GalleryViewer = () => {
  const route = useRoute<RouteProp<RootStackParams, 'GalleryViewer'>>();
  const navigation = useNavigation();
  const { images, index } = route.params;

  return (
    <ImageViewing
      images={images}
      imageIndex={index}
      visible={true}
      onRequestClose={() => navigation.goBack()}
    />
  );
};
