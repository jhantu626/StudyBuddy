import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Login, Onboarding, SplashScreen} from './Screens';
import {createStackNavigator} from '@react-navigation/stack';

const App = () => {
  const Stack = createStackNavigator();

  const [isLogin, setIsLogin] = useState(true);

  const AuthStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={Login} />
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
