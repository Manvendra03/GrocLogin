import {StyleSheet, Text, View,TextInput} from 'react-native';
import React from 'react';

const MyTextInput = ({style,placeholder,inputMode,secureTextEntry,variable, setVariable , obsecureText}) => {
  return (
    
      <TextInput
        cursorColor={'grey'}
        selectionColor={'grey'}
        placeholder={placeholder ?? ''} 
        inputMode= {inputMode??'default'}
        secureTextEntry={obsecureText??false}
        onChangeText={(text)=>{
          setVariable(text)
        }}
        // secureTextEntry ={secureTextEntry??'false'}
        numberOfLines={1}
        style={[
            {
                width: '100%',
                borderWidth: 2,
                borderRadius: 5,
                borderColor: '#BABABA',
                fontSize: 15,
                fontWeight: 'normal',
                paddingHorizontal: 10,
                paddingVertical: 12,
                color: 'grey',
                marginVertical: 10,
              },
              style
        ]}
      />
  );
};

export default MyTextInput;

const styles = StyleSheet.create({});
