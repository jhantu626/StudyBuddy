import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useState} from 'react';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [authToken, setAuthToken] = useState();

  const login = async token => {
    try {
      setAuthToken(token);
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setAuthToken(null);
    } catch (error) {
      console.error(error);
    }
  };

  const check = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      setAuthToken(token);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <AuthContext.Provider value={{authToken, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return new Error('Sorry context not found');
  }
  return context;
};

export {useAuth};

export default AuthProvider;
