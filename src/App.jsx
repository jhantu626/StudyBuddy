import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Onboarding, SplashScreen} from './Screens';
import {createStackNavigator} from '@react-navigation/stack';

const App = () => {
  const Stack = createStackNavigator();

  const [isLogin, setIsLogin] = useState(true);

  const AuthStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{
            animation: 'slide_from_right',
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 500,
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 500,
                },
              },
            },
          }}
        />
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
