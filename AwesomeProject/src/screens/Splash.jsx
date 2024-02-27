import {View, Text, SafeAreaView, StatusBar, Animated} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import Title from '../assets/common/Title';

const Splash = ({navigation}) => {
  const translateY = new Animated.Value(0);
  const duration = 800;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 20,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
      }}>
      <StatusBar barStyle={'light-content'} />
      <Animated.View style={{transform: [{translateY}]}}>
        <Title text={'RealTime ChatApp'} color={'#fff'} />
      </Animated.View>
    </SafeAreaView>
  );
};

export default Splash;
