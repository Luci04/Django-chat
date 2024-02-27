import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  PanResponder,
  Image,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Requests from './Requests';
import Friends from './Friends';
import Profile from './Profile';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const Tab = createBottomTabNavigator();

const Home = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        headerLeft: () => {
          return (
            <View style={{marginLeft: 16}}>
              <Image
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: '#e0e0e0',
                }}
                source={{
                  uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                }}
              />
            </View>
          );
        },

        headerRight: () => (
          <TouchableOpacity>
            <Entypo
              style={{
                marginRight: 16,
              }}
              name={'magnifying-glass'}
              size={28}
              color={'#404040'}
            />
          </TouchableOpacity>
        ),
        // tabBarStyle: {
        //   height: 80,
        //   alignItems: 'center',
        //   justifyContent: 'center',
        //   position: 'absolute',
        //   bottom: 0,
        //   borderTopLeftRadius: 20,
        //   borderTopRightRadius: 20,
        // },
        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarIcon: ({focused, color, size}) => {
          const icons = {
            Requests: 'bell',
            Friends: 'inbox',
            Profile: 'user',
          };

          const icon = icons[route.name];

          return (
            <Icon name={icon} size={30} color={focused ? '#4F8EF7' : 'gray'} />
          );
        },
      })}>
      <Tab.Screen name="Requests" component={Requests} />
      <Tab.Screen name="Friends" component={Friends} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Home;
