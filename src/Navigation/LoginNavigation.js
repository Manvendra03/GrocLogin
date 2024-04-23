import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import GreetScreen from '../Screens/GreetScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogInScreen from '../Screens/LogInScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import HomeScreen from '../Screens/HomeScreen';

import {firebase} from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const LoginNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="GreetScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="GreetScreen" component={GreetScreen} />
        <Stack.Screen name="LogInScreen" component={LogInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginNavigation;

const styles = StyleSheet.create({});
