import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Empty from '../assets/common/Empty';
import utils from '../core/utils';
import Feather from 'react-native-vector-icons/Feather';
import useGlobal from '../core/global';

const SearchButton = ({user}) => {
  if (user.status === 'connected') {
    return <Feather name={'check-circle'} size={30} color={'#20d080'} />;
  }

  const data = {};

  switch (user.status) {
    case 'no-connection':
      data.text = 'Connect';
      data.disabled = false;
      data.onPress = () => {};
      break;
    case 'pending-them':
      data.text = 'Pending';
      data.disabled = true;
      data.onPress = () => {};
      break;
    case 'pending-me':
      data.text = 'Accept';
      data.disabled = false;
      data.onPress = () => {};
      break;
    default:
      break;
  }

  return (
    <TouchableOpacity
      style={{
        backgroundColor: data.disabled ? '#505055' : '#202020',
        paddingHorizontal: 14,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
      }}
      disabled={data.disabled}>
      <Text style={{fontWeight: 'bold'}}>{data.text}</Text>
    </TouchableOpacity>
  );
};

const SearchRow = ({user}) => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
        height: '106',
      }}>
      <Image
        source={{uri: utils.thumbnail(user.thumbnail)}}
        style={{width: 76, height: 76, borderRadius: 38}}
      />
      <View style={{flex: 1, paddingHorizontal: 16}}>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#202020',
            marginBottom: 4,
          }}>
          {user.name}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#606060',
          }}>
          @{user.username}
        </Text>
      </View>
      <SearchButton user={user} />
    </View>
  );
};

const Search = () => {
  const [query, setQuery] = useState('');

  // const result = [
  //   {
  //     thumbnail: null,
  //     name: 'Avinash Shukla',
  //     username: 'avinash',
  //     status: 'pending-them',
  //   },
  //   {
  //     thumbnail: null,
  //     name: 'Avinash Shukla',
  //     username: 'avinashb',
  //     status: 'pending-me',
  //   },
  //   {
  //     thumbnail: null,
  //     name: 'Avinash Shukla',
  //     username: 'avinashc',
  //     status: 'connected',
  //   },
  //   {
  //     thumbnail: null,
  //     name: 'Avinash Shukla',
  //     username: 'avinashd',
  //     status: 'not-connected',
  //   },
  // ];

  const searchList = useGlobal(state => state.searchList);

  const searchUsers = useGlobal(state => state.searchUsers);

  useEffect(() => {
    searchUsers(query);
  }, [query]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
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
              color: '#000',
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

        {searchList === null ? (
          <Empty
            icon="search"
            message={'Search for firends'}
            centered={false}
          />
        ) : searchList.length === 0 ? (
          <Empty
            icon="alert-triangle"
            message={'No User Found'}
            centered={false}
          />
        ) : (
          <FlatList
            data={searchList}
            renderItem={({item}) => {
              return <SearchRow user={item} />;
            }}
            keyExtractor={item => item.username}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Search;
