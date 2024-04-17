import { Pressable, Text } from "react-native";
import { colors, styles } from "../../config/theme/app-theme";

interface Props {
    label: string;
    colorButton?: string;
    doubleWidth?: boolean;
    blackText?: boolean;
    onPress: () => void;
    onLongPress?: () => void;
}

export const CalculatorButton = ({ 
    label,
    colorButton = colors.darkGray,
    doubleWidth = false,
    blackText = false,
    onPress
 }:Props) => {
  return (
    <Pressable
        onPress={ () => onPress() } 
        style={({pressed}) => ({
        ...styles.button,
        backgroundColor: colorButton,
        opacity: (pressed) ? 0.8 : 1,
        width: (doubleWidth) ? 180 : 80,
    })}>
      <Text style={{
          ...styles.buttonText,
          color: (blackText) ? 'black' : 'white'
        }}>{ label }</Text>
    </Pressable>
  );
};
