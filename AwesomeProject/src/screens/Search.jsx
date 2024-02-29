import {View, Text, SafeAreaView, TextInput} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Empty from '../assets/common/Empty';

const Search = () => {
  const [query, setQuery] = useState('');

  const result = null;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          padding: 16,
          borderBottomWidth: 1,
          borderColor: '#f0f0f0',
        }}>
        <View>
          <TextInput
            style={{
              backgroundColor: '#e1e2e4',
              height: 52,
              borderRadius: 26,
              padding: 16,
              fontSize: 16,
              paddingLeft: 50,
            }}
            value={query}
            onChangeText={setQuery}
            placeholder="Search..."
            placeholderTextColor="#b0b0b0"
          />
          <Entypo
            name="magnifying-glass"
            size={20}
            color="#505050"
            style={{
              position: 'absolute',
              left: 20,
              top: 17,
            }}
          />
        </View>

        {result === null ? (
          <Empty
            icon="search"
            message={'Search for firends'}
            centered={false}
          />
        ) : result.length === 0 ? (
          <Empty
            icon="alert-triangle"
            message={'No User Found'}
            centered={false}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default Search;
