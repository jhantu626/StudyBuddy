import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  AuthHome,
  Login,
  Onboarding,
  Otp,
  Register,
  SplashScreen,
} from './Screens';
import {createStackNavigator} from '@react-navigation/stack';

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

  const AppNav = () => {
    return <AuthStack />;
  };

  return (
    <NavigationContainer>
      <AppNav />
    </NavigationContainer>
  );
};

export default App;
