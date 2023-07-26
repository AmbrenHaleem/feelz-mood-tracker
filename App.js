import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import MoodsScreen from './src/components/screens/MoodsScreen/index.js';
import SettingsScreen from './src/components/screens/SettingsScreen/index.js';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { primaryColor } from './src/includes/variable';
import { FontAwesome, MaterialIcons, AntDesign } from '@expo/vector-icons';
import Header from './src/components/Header';
import HomeScreen from './src/components/screens/HomeScreen/index.js';
import { Provider } from 'react-redux';
import { store } from './src/redux/store.js';
import * as database from './src/database/localdb.js';
import styles from './src/styles/main'
SplashScreen.preventAutoHideAsync()
  .then((prevented) => {
    console.log('Prevented:', prevented);
  })
  .catch((error) => {
    console.log('Prevent error:', error);
  });

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLocked, setIsLocked] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('');

  useEffect(() => {
    console.log("Loading DB...");

    SplashScreen.hideAsync()
      .then((hidden) => {
        console.log('Hidden:', hidden);
      })
      .catch((error) => {
        console.log('Hidden error:', error);
      });
  }, []);

  const handleUnlock = () => {
    if (enteredPassword === '123') {
      setIsLocked(false);
      setEnteredPassword(''); 

    } else {
    }
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        {
          isLocked &&  <View style={lockStyles.lockScreenContainer}>
          <View style={lockStyles.lockScreen}>
            <TextInput
              style={lockStyles.passwordInput}
              secureTextEntry
              value={enteredPassword}
              onChangeText={setEnteredPassword}
              placeholder="Enter Password"
            />
            <TouchableOpacity
              style={lockStyles.unlockButton}
              onPress={handleUnlock}
            >
              <Text style={lockStyles.unlockButtonText}>Unlock</Text>
            </TouchableOpacity>
          </View>
        </View>
        }
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
            tabBarLabelPosition: 'below-icon',
            tabBarStyle: { paddingBottom: 10, paddingTop: 10, height: 60 }
          }}>
            <Tab.Screen name='HomeScreen'
              // component={HomeScreen} 
              options={{
                headerShown: false,
                title: 'Home',
                tabBarIcon: ({ focused, color, size }) => (
                  <FontAwesome name="home" size={size} color={color} />
                )
              }}
            >
              {(props) => (
                <HomeScreen {...props} />
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
              }}
            />
            <Tab.Screen name='SettingsScreen'
              // component={SettingsScreen}
              options={{
                title: 'Settings',
                headerTintColor: '#fff',
                headerStyle: {
                  backgroundColor: primaryColor
                },
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="setting" size={size} color={color} />
                )
              }}
            >
              {(props)=> <SettingsScreen {...props} setIsLocked={setIsLocked}></SettingsScreen>}
            </Tab.Screen>
          </Tab.Navigator>
        </View>
      
      </NavigationContainer>
    </Provider>
  );
}

const lockStyles = StyleSheet.create({
  lockScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    zIndex:100,
    width:'100%',
    backgroundColor:'#fff',
    height:'100%'
  },
  lockScreen: {
    width: Dimensions.get('window').width * 0.8,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  passwordInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  unlockButton: {
    backgroundColor: primaryColor,
    paddingVertical: 10,
    borderRadius: 5,
  },
  unlockButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

