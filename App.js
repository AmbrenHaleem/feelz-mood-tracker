import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import MoodsScreen from './src/components/screens/MoodsScreen/index.js';
import SettingsScreen from './src/components/screens/SettingsScreen/index.js';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { primaryColor } from './src/includes/variable';
import styles from './src/styles/main';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Header from './src/components/Header';
import HomeScreen from './src/components/screens/HomeScreen/index.js';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()
.then((prevented) => {
  console.log('Prevented:', prevented);
})
.catch((error) => {
  console.log('Prevent error:',error);
})

const Tab = createBottomTabNavigator();

export default function App() {

  useEffect(() => {
    console.log("Loading DB...");

    // Hides the Splash Screen that was prevented to auto hide.
    SplashScreen.hideAsync()
    .then((hidden) => {
      console.log('Hidden:', hidden);
    })
    .catch((error) => {
      console.log('Hidden error:',error);
    })
  },[]);

  const [moods,setMoods] = useState([]);
  return (
    <NavigationContainer>
      <View style={styles.containter}>
        <StatusBar style='auto' />
<Header />
        <Tab.Navigator screenOptions={{
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerStyle: {
            backgroundColor: primaryColor
          },
          tabBarShowLabel: true,
          tabBarLabelPosition: 'below-icon'
        }}>
          <Tab.Screen name='HomeScreen' 
          // component={HomeScreen} 
          options={{
            headerShown: false,
            title : 'Home',
            tabBarIcon: ({focused, color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
            )
          }}
          >
          {(props) => (
            <HomeScreen {...props} moods={moods}/>
          )}
          </Tab.Screen>
          <Tab.Screen name='MoodsScreen' 
          component={MoodsScreen} 
          options={{
            title: 'Add Mood',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: primaryColor
            },
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="mood" size={size} color={color} />
            )
          }}/>
          <Tab.Screen name='SettingsScreen' 
          component={SettingsScreen} 
          options={{
            title: 'Settings',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: primaryColor
            },
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="setting" size={size} color={color} />
            )
          }}/>
        </Tab.Navigator>

      </View>
    </NavigationContainer>
    
  );
}
