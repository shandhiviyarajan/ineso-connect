import React from "react"
import {StyleSheet, View,TextInput, Text} from "react-native"

export const FormInput = (props:any) => {
    return (
        <View style={{position:'relative', width:'100%'}}>
               <Text style={FormInputStyles.Label}>{props.defaultValue && props.defaultValue.length > 0 ? props.placeholder : ''}</Text>
               <TextInput {...props}
            style={FormInputStyles.Input}
        />
        </View>
      
    )
}

const FormInputStyles = StyleSheet.create({
    Label:{
        color:'#c1c2c2',
        position:'absolute',
        right:0,
        bottom:16,
        backgroundColor:'#fff',
        zIndex:10
      },
    Input: {
        height: 44,
        fontSize: 16,
        color: "#216FED",
        textAlign: "left",
        paddingVertical: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: "rgba(33,111,237,.5)",
        marginVertical: 4,
        width: "100%",
        fontWeight: "500",
    }
})
