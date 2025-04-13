import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  AuthHome,
  Home,
  Login,
  Onboarding,
  Otp,
  Register,
  SplashScreen,
} from './Screens';
import {createStackNavigator} from '@react-navigation/stack';
import AuthProvider, {useAuth} from './Contexts/AuthContext';

const App = () => {
  const Stack = createStackNavigator();

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
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
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
