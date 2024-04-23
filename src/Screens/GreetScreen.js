import {StyleSheet, Text, SafeAreaView, View, Button} from 'react-native';
import React from 'react';
import LoginSVG from '../Assets/login.svg';
import MyButton from '../Components/Button';

const GreetScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <LoginSVG style={{height: 400, width: 400, alignSelf: 'center'}} />
      <View
        style={{
          marginTop: 30,
          paddingHorizontal: 20,
          alignSelf: 'center',
          //   justifyContent: 'space-evenly',
        }}>
        <Text style={{fontSize: 26, fontWeight: 'bold'}}>
          Good Morning sir!
        </Text>
        <Text style={{color: '#BABABA', fontSize: 10, marginVertical: 20}}>
          To o use Jest to test your React Native components that import .svg
          images, you need to add this configuration that mo use Jest to test
          your React Native components that import .svg images, you need to add
          this configuration that mocks the SVG images that are transforme
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontWeight: '500',
            marginTop: 10,
            marginBottom: 10,
          }}>
          LogIn/SignUp to continue
        </Text>
        <MyButton
          title="Log In"
          style={{marginVertical: 0, width: '100%'}}
          textStyle={{fontSize: 20, fontWeight: '600'}}
          onPress={()=>{
            navigation.navigate('LogInScreen')
          }}
        />
        <MyButton
          title="Sign In"
          style={{marginVertical: 10, width: '100%'}}
          textStyle={{fontSize: 20, fontWeight: '600'}}
          onPress={()=>{
            navigation.navigate('SignUpScreen')
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default GreetScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#E6EFFF',
  },
});
