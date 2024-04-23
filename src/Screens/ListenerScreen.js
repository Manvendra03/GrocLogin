import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {firebase} from '@react-native-firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';

const ListenerScreen = () => {
  const [text, setText] = useState('listening the description');
  const [list, setList] = useState([1]);
  useEffect(() => {
    var db = firebase.firestore();

    // Reference to a specific document
    var docRef = db.collection('User').doc('mm@gmail.com');

    // Attach a snapshot listener to the document
    var unsubscribe = docRef.onSnapshot(function (snapshot) {
      // Handle document changes here
      console.log('Document data: ', snapshot.data().items.length);
      setText(snapshot.data().name);
      setList(snapshot.data().items);
    });

    // return () => unsubscribe();
  }, []);

  const renderItem = ({item}) => (
    <View
      style={{
        height: 90,
        backgroundColor: 'grey',
        marginVertical: 5,
        marginHorizontal: 20,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontWeight: 'bold', fontSize: 22, color: 'black'}}>
        {item}
      </Text>
    </View>
  );
  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        flex: 1,
         paddingHorizontal: 30,
        paddingVertical: 40,
      }}>
         <Text style={{fontWeight: 'bold', fontSize: 22, color: 'black' , textAlign: "center"}}>
        Listening to the chnages and auto update: 
      </Text>
      <Text style={{fontSize: 17, fontWeight: 'bold', color: 'black' , }}>
        User Name :
      </Text>
      <View
        style={{
          borderRadius: 7,
          borderWidth: 2,
          borderColor: 'grey',
          padding: 10,
        }}>
        <Text style={{fontSize: 12, fontWeight: 'normal', color: 'grey'}}>
          {text}
        </Text>
      </View>
      <View style={{width: '100%'}}>
        <FlatList data={list} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
};

export default ListenerScreen;

const styles = StyleSheet.create({});
