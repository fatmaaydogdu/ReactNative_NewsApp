import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Saved from '../screens/Saved';
import NewsOverview from '../screens/NewsOverview';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
   <Tab.Navigator screenOptions={{ headerShown:false }}>
    <Tab.Screen name='Anasayfa' component={Home} options={{headerShown: false,
          tabBarLabel: 'Anasayfa',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }} />
    <Tab.Screen name='Saved' component={Saved} options={{ headerShown: false,
          tabBarLabel: 'Kaydedilenler',
          tabBarIcon: ({ color, size }) => (
            <Icon name="newspaper-variant" color={color} size={size} />
          ),
        }}/>
   </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown:false }} name="HomeScreen" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Haber Detayı" component={NewsOverview}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
