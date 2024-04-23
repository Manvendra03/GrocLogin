import {StyleSheet, Text, SafeAreaView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {auth, firebase} from '@react-native-firebase/auth';
import LoginNavigation from './src/Navigation/LoginNavigation';
import MainNavigation from './src/Navigation/MainNavigation';


import messaging from '@react-native-firebase/messaging';


const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  // const {loginStatus , changeLoginStatus} = useLoginContext;
  // const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setCurrentUser(user);
    // if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);

    console.log('User Changed .....  Newemail--->', currentUser);

    // FCM token
    checkToken();

    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        'A new FCM message arrived! on foreground',
        JSON.stringify(remoteMessage),
      );
    });

    return unsubscribe;
  }, []);

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(' :::::: |' + fcmToken + '| :::::::: ');
    }
  };

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const user = firebase.auth().currentUser;

        if (user) {
          console.log('User is already logged in ---------', user.email);
          setCurrentUser(user);
          changeLoginStatus(true);
        } else {
          console.log('User is not logged in ----------');
        }
      } catch {
        e => {
          console.log(e);
        };
      }
    };

    checkUserLoggedIn();
  }, []);

  if (currentUser) {
    console.log('CurrentUSer --- ' + firebase.auth().currentUser.email);
    return <MainNavigation />;
  } else {
    console.log('CurrentUser --- ' + null);
    return <LoginNavigation />;
  }
};

export default App;

const styles = StyleSheet.create({});
