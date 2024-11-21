import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { FormStyles } from "../assets/styles/FormStyles"

type ButtonProps = TouchableOpacityProps & {
    buttonText: any
}

export const Button : React.FC<ButtonProps> = ({buttonText, ...rest}) => {
    return(
        <TouchableOpacity style={FormStyles.button} {...rest}>
            {buttonText}
        </TouchableOpacity>
    )
}