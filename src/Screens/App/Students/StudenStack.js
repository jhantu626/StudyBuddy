import {createStackNavigator} from '@react-navigation/stack';
import Students from './Students';
import StudentRegistration from './StudentRegistration';

const Stack = createStackNavigator();
const StudentStack = () => (
  <Stack.Navigator initialRouteName="Student" screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen name="Student" component={Students} />
    <Stack.Screen name="StudentRegistration" component={StudentRegistration} />
  </Stack.Navigator>
);

export default StudentStack;
