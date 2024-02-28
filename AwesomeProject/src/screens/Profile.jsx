import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import useGlobal from '../core/global';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {launchImageLibrary} from 'react-native-image-picker';
import utils from '../core/utils';

function ProfileImage() {
  const uploadThumbnail = useGlobal(state => state.uploadThumbnail);
  const user = useGlobal(state => state.user);

  return (
    <TouchableOpacity
      onPress={() => {
        launchImageLibrary(
          {includeBase64: true, selectionLimit: 1},
          response => {
            // console.log(response);
            if (response.didCancel) return;
            const file = response.assets[0];
            uploadThumbnail(file);
          },
        );
      }}>
      <Image
        source={{
          uri: utils.thumbnail(user.thumbnail),
        }}
        style={{
          width: 180,
          height: 180,
          borderRadius: 90,
          backgroundColor: '#e0e0e0',
        }}
      />
      <View
        style={{
          borderWidth: 4,
          borderColor: '#fff',
          backgroundColor: '#282828',
          width: 50,
          height: 50,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}>
        <FontAwesomeIcon name="pencil" size={15} color="#d0d0d0" />
      </View>
    </TouchableOpacity>
  );
}

function ProfileLogout() {
  const logout = useGlobal(state => state.logout);

  return (
    <TouchableOpacity
      onPress={logout}
      style={{
        flexDirection: 'row',
        height: 32,
        borderRadius: 26,
        alignItems: 'center',
        paddingHorizontal: 26,
        backgroundColor: '#202020',
      }}>
      <Text style={{fontWeight: 'bold', color: '#d0d0d0'}}>Logout</Text>
    </TouchableOpacity>
  );
}

const Profile = () => {
  const user = useGlobal(state => state.user);

  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        gap: 20,
      }}>
      <ProfileImage />
      <Text
        style={{
          textAlign: 'center',
          color: '#303030',
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        {user.name}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          color: '#606060',
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        @{user.username}
      </Text>
      <ProfileLogout />
    </SafeAreaView>
  );
};

export default Profile;
