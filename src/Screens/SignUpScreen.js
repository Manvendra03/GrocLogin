import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Touchable,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import TextInput from '../Components/TextInput';
import MyTextInput from '../Components/TextInput';
import MyButton from '../Components/Button';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

async function handleCreateAccount(email, password) {
  // console.log('called!!');

  return await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async () => {
      console.log('Account is created !!');
      return true;

    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('-------Email is alreadyyy in use !!! ---------');
        return false;
      } else {
        console.log('-----something went wrong ------- ' + error.code);
        return false;
      }
    });
}

const SignUpScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isMatched, setIsMAtched] = useState(true);

  function handleConfirmPassword(password, confirmPassword) {
    if (password === confirmPassword) {
      setIsMAtched(true);
      return true;
    } else {
      setIsMAtched(false);
      return false;
    }
  }

  return (
    <SafeAreaView style={{height: '100%', width: '100%'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{position: 'relative', top: 10, left: 10}}>
        <Image
          source={require('../Assets/arrow.png')}
          style={{height: 40, width: 40}}
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            paddingBottom: 5,
            color: 'black',
          }}>
          Create Account
        </Text>
        <Text style={{fontWeight: '600', color: 'grey', marginBottom: 30}}>
          SignUp to get started !
        </Text>
        <MyTextInput
          placeholder={'UserName'}
          inputMode={'email'}
          variable={userName}
          setVariable={setUserName}
        />
        <MyTextInput
          placeholder={'Email Address'}
          inputMode={'email'}
          variable={emailAddress}
          setVariable={setEmailAddress}
        />
        <MyTextInput
          placeholder={'Password'}
          inputMode={'text'}
          secureTextEntry={true}
          variable={password}
          setVariable={setPassword}
          obsecureText={true}
        />

        <MyTextInput
          placeholder={'Confirm Password'}
          inputMode={'text'}
          secureTextEntry={true}
          variable={confirmPassword}
          setVariable={setConfirmPassword}
          style={{marginBottom: 0}}
          obsecureText={true}
        />
        {isMatched ? (
          <View />
        ) : (
          <Text style={{color: 'red', fontSize: 10, fontWeight: 'normal'}}>
            {' '}
            **Both the passwords must be same
          </Text>
        )}
        <MyButton
          onPress={async () => {
            // console.log(userName);
            // console.log(emailAddress);
            // console.log(password);
            // console.log(confirmPassword);

            if (handleConfirmPassword(password, confirmPassword)) {
              (await handleCreateAccount(emailAddress, password))
                ? async() =>{
                  
                }
                : () => {};
            }
          }}
          title={'SignUp'}
          textStyle={{fontWeight: 'bold', fontSize: 18}}
          style={{width: '100%', marginBottom: 40, marginTop: 50}}
        />
      </View>
      <View style={styles.bottomBox}>
        <View
          style={{
            width: '85%',
            height: 1,
            backgroundColor: '#BABABA',
            marginBottom: 10,
          }}
        />
        <View flexDirection={'row'}>
          <Text style={{fontWeight: '600', color: 'grey'}}>
            Already have an account ?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.replace('LogInScreen');
            }}>
            <Text style={{fontWeight: 'bold', color: 'blue'}}>LogIn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    height: '100%',
    width: '100%',
    paddingHorizontal: 20,
  },
  bottomBox: {
    height: 70,
    width: '100%',
    // backgroundColor: "grey",
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
});
