import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';

import React, {useState} from 'react';
import TextInput from '../Components/TextInput';
import MyTextInput from '../Components/TextInput';
import Modal from 'react-native-modal';
import MyButton from '../Components/Button';
import FacebookSVG from '../Assets/facebook.svg';
import GoogleSVG from '../Assets/google.svg';
import TwitterSVG from '../Assets/twitter.svg';
import {firebase, auth} from '@react-native-firebase/auth';
import HomeScreen from './HomeScreen';

const handleSignIn = async (email, password) => {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    // User signed in successfully
    console.log('Sign In Successful');

    return true;
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      console.log('User Not Found', 'Please check your email and try again.');
    } else if (error.code === 'auth/wrong-password') {
      console.log(
        'Incorrect Password',
        'Please check your password and try again.',
      );
    } else {
      console.log(
        'Sign In Failed',
        'An error occurred, please try again later-----' + error,
      );
    }
  }
  return false;
};

const LogInScreen = ({navigation}) => {
  const [forgetModelVisible, setForgetModelVisible] = useState(false);
  const [forgetPassword, setForgetPassword] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  function forgetPasswordSendEmail(Email) {
    firebase
      .auth()
      .sendPasswordResetEmail(Email)
      .then(function (user) {
        alert('Please check your email...');
        // console('Please Check Your Email');
      })
      .catch(function (e) {
        console.log(e);
        console('forget Error' + e);
      });
  }

  const forgetModel = () => {
    return (
      <Modal
        isVisible={forgetModelVisible}
        onBackdropPress={() => {
          setForgetModelVisible(false);
        }}>
        <View
          style={{
            height: 450,
            width: '100%',
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderRadius: 15,
            paddingBottom: 30,
          }}>
          <Image
            source={require('../Assets/forgetPassword.jpg')}
            style={{height: '60%', width: '70%', marginBottom: 30}}
          />
          <View style={{width: '100%', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              Enter you Email for OTP{' '}
            </Text>
            <TextInput
              style={{width: '80%'}}
              placeholder={'emailAddress'}
              inputMode={'email'}
              variable={forgetPassword}
              setVariable={setForgetPassword}></TextInput>
          </View>
          <MyButton
            onPress={() => {
              forgetPasswordSendEmail('manvendrapatidar03@gmail.com');
            }}
            title={'Submit'}
            style={{paddingHorizontal: 40}}
          />
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={{height: '100%'}}>
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
          Welcome
        </Text>
        <Text style={{fontWeight: '600', color: 'grey', marginBottom: 30}}>
          Enter Your Details for LogIn
        </Text>
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
          obsecureText={true}
          setVariable={setPassword}
        />
        <TouchableOpacity
          style={{marginBottom: 50}}
          onPress={() => {
            setForgetModelVisible(true);
          }}>
          <Text
            style={{fontWeight: '600', color: 'black', alignSelf: 'flex-end'}}>
            Forget Password ?
          </Text>
        </TouchableOpacity>
        <MyButton
          onPress={async () => {
            console.log(emailAddress);
            console.log(password);

            await handleSignIn(emailAddress, password);
          }}
          title={'Login'}
          textStyle={{fontWeight: 'bold', fontSize: 18}}
          style={{width: '100%', marginBottom: 40}}
        />
        <View
          style={{
            height: 80,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{width: '30%', height: 1, backgroundColor: 'grey'}}></View>
            <Text style={{paddingHorizontal: 20, color: 'grey', fontSize: 12}}>
              Or Login with
            </Text>
            <View
              style={{width: '30%', height: 1, backgroundColor: 'grey'}}></View>
          </View>
          <View flexDirection="row" alignItems={'center'}>
            <TouchableOpacity>
              <FacebookSVG height={40} marginHorizontal={5} />
            </TouchableOpacity>
            <TouchableOpacity>
              <GoogleSVG height={35} marginHorizontal={5} />
            </TouchableOpacity>
            <TouchableOpacity>
              <TwitterSVG height={40} marginHorizontal={5} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {forgetModelVisible ? (
        forgetModel({forgetModelVisible, setForgetModelVisible})
      ) : (
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
              Don't have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.replace('SignUpScreen');
              }}>
              <Text style={{fontWeight: 'bold', color: 'blue'}}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
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
  forgetModel: {
    position: 'absolute',
    bottom: 10,
    zIndex: 3,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, // Ensure it renders on top of other components
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
});
