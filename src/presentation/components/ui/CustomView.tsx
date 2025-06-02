import {StyleProp, Text, View, ViewStyle} from 'react-native';

import {ReactNode, useContext} from 'react';
import { colors, globalStyles } from '../../../config/theme/theme';



interface Props {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  margin?: boolean;
}

export const CustomView = ({style, children, margin = false}: Props) => {

 

  return (
    <View
      style={[
        globalStyles.mainContainer,
        margin ? globalStyles.globalMargin : null,
        { backgroundColor: colors.background },
        style,
      ]}>
      {children}
    </View>
  );
};
