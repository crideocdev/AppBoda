//accedemos a presentation/assests/carousel
//y recogemos todas las imagenes que se llamen imageX.jpg// src/utils/get-images.ts
export const getImages = (count: number) => {
    const images = [
      require('../../../assets/carousel/image1.jpg'),
      require('../../../assets/carousel/image2.jpg'),
      require('../../../assets/carousel/image3.jpg'),
      require('../../../assets/carousel/image4.jpg'),
      require('../../../assets/carousel/image5.jpg'),
      require('../../../assets/carousel/image6.jpg'),
      require('../../../assets/carousel/image7.jpg'),
      require('../../../assets/carousel/image8.jpg'),
    ];

    return images.slice(0, count);
  };