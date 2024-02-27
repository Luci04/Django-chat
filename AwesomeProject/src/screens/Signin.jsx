import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import Title from '../assets/common/Title';
import {Input} from '../assets/common/Input';
import {Button} from '../assets/common/Button';
import api from '../core/api';
import log from '../core/utils';
import useGlobal from '../core/global';

const Signin = ({navigation}) => {
  const [userName, setuserName] = useState('avinash');
  const [password, setPassword] = useState('avinashukla');
  const login = useGlobal(state => state.login);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onSignIn = () => {
    console.log(userName, password);

    api({
      method: 'POST',
      url: '/chat/signin/',
      data: {
        username: userName,
        password: password,
      },
    })
      .then(response => {
        log('SignIn :', response.data);
        login(response.data);
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}>
            <Title text="RealtimeChat" color="#202020" />

            <Input title={'Username'} value={userName} onChange={setuserName} />
            <Input
              title={'Password'}
              value={password}
              onChange={setPassword}
              isPassword={true}
            />

            <Button title={'Sign In'} onPress={onSignIn} />

            <Text style={{textAlign: 'center', marginTop: 40, color: '#000'}}>
              Don't have an account?{' '}
              <Text
                style={{color: 'blue'}}
                onPress={() => {
                  navigation.navigate('SignUp');
                }}>
                Sign up
              </Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signin;
