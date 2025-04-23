import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import RainForecastScreen from '../screens/RainForecastScreen';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabNavigator = ({ initialRouteName }: { initialRouteName: string }) => {
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Accueil') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Prévisions de pluie') {
            iconName = focused ? 'water' : 'water-outline';
          } else if (route.name === 'Recherche') {
            iconName = focused ? 'search' : 'search-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Prévisions de pluie" component={RainForecastScreen} />
      <Tab.Screen name="Recherche" component={SearchScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const [activeScreen, setActiveScreen] = useState('Accueil');

  const handleDrawerStateChange = (state: any) => {
    if (state && state.routes) {
      const currentScreen = state.routes[state.index].name;
      setActiveScreen(currentScreen);
    }
  };

  const handleTabStateChange = (state: any) => {
    if (state && state.routes) {
      const currentScreen = state.routes[state.index].name;
      setActiveScreen(currentScreen);
    }
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerActiveTintColor: '#007AFF',
          drawerInactiveTintColor: 'gray',
        }}
        screenListeners={{
          state: handleDrawerStateChange,
        }}
      >
        <Drawer.Screen 
          name="Accueil" 
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        >
          {() => <TabNavigator initialRouteName="Accueil" />}
        </Drawer.Screen>
        <Drawer.Screen 
          name="Prévisions de pluie" 
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="water-outline" size={size} color={color} />
            ),
          }}
        >
          {() => <TabNavigator initialRouteName="Prévisions de pluie" />}
        </Drawer.Screen>
        <Drawer.Screen 
          name="Recherche" 
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="search-outline" size={size} color={color} />
            ),
          }}
        >
          {() => <TabNavigator initialRouteName="Recherche" />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 