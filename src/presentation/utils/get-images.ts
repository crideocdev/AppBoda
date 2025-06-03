//accedemos a presentation/assests/carousel
//y recogemos todas las imagenes que se llamen imageX.jpg// src/utils/get-images.ts
export const getImages = (count: number) => {
    const images = [
      require('../assets/carousel/image1.jpg'),
      require('../assets/carousel/image2.jpg'),
    ];

    return images.slice(0, count);
  };