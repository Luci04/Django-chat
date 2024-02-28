/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './src/screens/Splash';
import {StatusBar, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signin from './src/screens/Signin';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import Message from './src/screens/Message';

const Stack = createNativeStackNavigator();
import useGlobal from './src/core/global';

function App() {
  const initialized = useGlobal(state => state.initialized);
  const authenticated = useGlobal(state => state.authenticated);
  const init = useGlobal(state => state.init);

  useEffect(() => {
    init();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!initialized ? (
          <>
            <Stack.Screen name="Splash" component={Splash} />
          </>
        ) : !authenticated ? (
          <>
            <Stack.Screen name="SignIn" component={Signin} />
            <Stack.Screen name="SignUp" component={Signup} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Messages" component={Message} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
