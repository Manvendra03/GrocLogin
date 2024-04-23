import {StyleSheet, Text, View} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import MyButton from '../Components/Button';
import {auth, firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MyTextInput from '../Components/TextInput';

import notifee , {AndroidStyle}from '@notifee/react-native';

async function DisplayLocalNotification() {
  // Request permissions (required for iOS)
  // await notifee.requestPermission()

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  

  // Display a notification   
  await notifee.displayNotification({
    title: 'Image Uploaded ',
    body: 'your follower @manvendra.apk upload an image ',
    android: {
      channelId,
      // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
      style: { type: AndroidStyle.BIGPICTURE, picture: 'https://wallpapers.com/images/featured/flower-pictures-unpxbv1q9kxyqr1d.jpg' },
      // style : { type: AndroidStyle.BIGTEXT, text: 'Large volume of text shown in the expanded state' }
    },
  });
}


 const HomeScreen = ({navigation}) => {
  const [desc, setDesc] = useState('default name ');

  const [email2, setEmail2] = useState('default ');
  const [items,setItems] = useState([1,2,3,4,5]);
  const [stringg1, setStringg1] = useState('String 1');
  const [stringg2, setStringg2] = useState('String 2');

  async function setDataToFirestore() {
    const user = firebase.auth().currentUser;
    await firestore()
      .collection('User')
      .doc(user.email)
      .set({
        name: email2,
        email2: email2,
        description: desc,
        items: items,
      })
      .then(() => {
        console.log('User added!' + user.email);
      })
      .catch(error => {
        console.log('Error --> ' + error);
      });
  }

  return (
    <View
      style={{justifyContent: 'space-evenly', flex: 1, paddingHorizontal: 20}}>
      <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
        Firebase firestore (Onrequest fetch)
      </Text>
      <View
        style={{
          borderColor: '#BABABA',
          borderWidth: 2,
          borderRadius: 10,
          padding: 10,
        }}>
        <MyTextInput
          placeholder={'Email Address 2'}
          inputMode={'email'}
          variable={email2}
          setVariable={setEmail2}
        />
        <MyTextInput
          placeholder={'description'}
          variable={desc}
          setVariable={setDesc}
        />
        <MyButton
          title={'Add Data'}
          onPress={async () => {
            //  Add data to the firebase
            await setDataToFirestore();

           
          }}
        />
      </View>
      <View>
        <Text style={{fontSize: 22, fontWeight: 'bold', alignSelf: 'center'}}>
          {stringg1}
        </Text>

        <Text style={{fontSize: 17, fontWeight: 'normal', alignSelf: 'center'}}>
          {stringg2}{' '}
        </Text>

        <MyButton
          title={'Fetch Data'}
          onPress={async () => {
            const user = firebase.auth().currentUser;

            //fetching from firestore
            const userData = await firestore()
              .collection('User')
              .doc(user.email)
              .get();

            console.log(userData.data().name);
            console.log(userData.data().description);

            setStringg1(userData.data().name);
            setStringg2(userData.data().description);
          }}
        />

        <MyButton
          title={'LogOut'}
          onPress={() => {
            firebase.auth().signOut();
          }}
        />
        <MyButton
          title={'stream Listener Page'}
          onPress={() => {
            navigation.navigate('ListenerScreen');
          }}
        />
         <MyButton
          title={'Local PushNotification'}
          onPress={() => {
            // Local Notification Fuction
            DisplayLocalNotification();
          }}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
