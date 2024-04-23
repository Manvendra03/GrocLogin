import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";


const MyButton = ({ title, onPress, style, textSize ,textStyle,disabled}) => {
  return (
   <View style={{ alignItems: 'center',justifyContent:'center'}}>
     <TouchableOpacity onPress={onPress} style={[styles.button, style]} disabled={disabled}>
      <Text style={[styles.text,textStyle]}> {title}</Text>
      {/* <Text> name={title} style={[styles.text,textStyle]} </Text> */}
    </TouchableOpacity>
   </View>
  );
}
export default MyButton;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    textAlign:'center',
    fontWeight:'500',
  },
  button: {
    backgroundColor: '#0270ff',
    padding: 14,
    marginVertical:10,
    borderRadius: 8,
    width:'60%'
  }
});