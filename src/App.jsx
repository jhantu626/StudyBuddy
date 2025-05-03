import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  AuthHome,
  Batch,
  Home,
  Login,
  Notes,
  Onboarding,
  Otp,
  Register,
  SplashScreen,
  Students,
} from './Screens';
import {createStackNavigator} from '@react-navigation/stack';
import AuthProvider, {useAuth} from './Contexts/AuthContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from './utils/colors';
import StudentStack from './Screens/App/Students/StudenStack';

const App = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const AuthStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="AuthHome" component={AuthHome} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Otp" component={Otp} />
      </Stack.Navigator>
    );
  };

  const AppStack = () => {
    return (
      <Tab.Navigator
        initialRouteName="Batch"
        backBehavior="history"
        screenOptions={{
          tabBarStyle: {
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: -4},
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 0,
          },
          animation: 'shift',
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesome5 name="swatchbook" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Note"
          component={Notes}
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesome5 name="file-download" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Batch"
          component={Batch}
          options={{
            tabBarIcon: ({color}) => (
              <SimpleLineIcons name="book-open" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Student"
          component={StudentStack}
          options={{
            tabBarIcon: ({size, color}) => (
              <FontAwesome5 name="user-graduate" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Home}
          options={{
            tabBarIcon: ({size, color}) => (
              <FontAwesome name="user-circle-o" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  const AppNav = () => {
    const {authToken} = useAuth();
    return (
      <NavigationContainer>
        {authToken ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    );
  };

  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
};

export default App;
