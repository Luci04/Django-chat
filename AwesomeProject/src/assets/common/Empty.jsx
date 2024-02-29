import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

const Empty = ({icon, message, centered = true}) => {
  console.log(message);
  return (
    <View
      style={{
        justifyContent: centered ? 'center' : 'flex-start',
        alignItems: 'center',
        paddingVertical: 120,
      }}>
      <Feather
        name={icon}
        color="#d0d0d0"
        style={{marginBottom: 16}}
        size={100}
      />
      <Text
        style={{
          color: '#c3c3c3',
          fontSize: 16,
        }}>
        {message}
      </Text>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({});
