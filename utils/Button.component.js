import React from 'react'
import {Text, TouchableOpacity} from 'react-native'
import buttonStyle from './Button.component.style'

const CustomButton = ({onPress, title}) => {
    return (
      <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.7}
      style={buttonStyle.buttonContainer}
      >
      <Text
      style={buttonStyle.buttonText}
      >{title}</Text>
      </TouchableOpacity>
    )
  }

  export default CustomButton 