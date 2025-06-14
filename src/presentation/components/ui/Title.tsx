import { Text, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useContext } from 'react';
import { colors, globalStyles } from '../../../config/theme/theme';


interface Props {
  text: string;
  safe?: boolean;
  white?: boolean;
}


export const Title = ({ text, safe = false, white = false }: Props) => {

  const { top } = useSafeAreaInsets();
  

  return (
    <Text
      style={{
        ...globalStyles.title,
        marginTop: safe ? top : 0,
        marginBottom: 10,
        color: white ? 'white' : colors.text
      }}
    >{ text }</Text>
  )
}