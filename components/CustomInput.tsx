import { StyleSheet, Text, View, TextInput, TextInputProps, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import React from 'react'

type InputEvent = string | NativeSyntheticEvent<TextInputChangeEventData>
type CustomInputProps = TextInputProps & {
  name: string,
  error: string | Array<string>,
  onChange: (value: InputEvent) => void
}

const CustomInput: React.FC<CustomInputProps> = ({ onChange ,name , error , onBlur}) => {
if( name === "password") {
  console.log({error, type: typeof error});
  
}
  return (
    <View>
      <Text style={styles.title} >{name}</Text>
      <TextInput style={[styles.input]} 
      placeholder={name} 
      placeholderTextColor={'#717171'}
      onChangeText={(text) => {onChange(text)}}
      onBlur={onBlur}
      />
      {
        error && typeof error === 'string' && (
          <Text style={styles.error}>{error}</Text>
        )
      }
      {
        error && typeof error === 'object' && error.map((error: string, index: number) => {
          return <Text key={index} style={styles.error}>{error}</Text>
        }

        )
      }
      
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
    title: {
        color: "white",
        fontSize: 24,
        fontWeight: "700",
        marginTop: 20,
        textAlign: "center",
        alignItems: "center",
      },
      input: {
        backgroundColor: "black",
        color: "white",
        padding: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        marginTop: 10,
      },
      error: {
        color: 'black',
        marginHorizontal: 10,
        marginVertical: 10
      }
})