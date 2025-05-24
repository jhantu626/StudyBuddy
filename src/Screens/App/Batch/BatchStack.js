import {createStackNavigator} from '@react-navigation/stack';
import Batch from './Batch';
import CreateBatch from './CreateBatch';

const Stack = createStackNavigator();

const BatchStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Batch"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Batch" component={Batch} />
      <Stack.Screen name="CreateBatch" component={CreateBatch} />
    </Stack.Navigator>
  );
};

export default BatchStack;
