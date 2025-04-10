import {View, Text, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Use any icon library
import { fonts } from './fonts';

const {width} = Dimensions.get('window');

const toastConfig = {
  /*
   * Success Toast
   */
  success: ({text1}) => (
    <View
      style={{
        width: 'auto', 
        height: 40, 
        backgroundColor: '#4CAF50',
        borderRadius: 20, 
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        justifyContent: 'center',
      }}>
      <Icon name="check-circle" size={28} color="white" /> {/* Success icon */}
      <Text style={{color: 'white', marginLeft: 10, fontFamily: fonts.medium}}>
        {text1}
      </Text>
    </View>
  ),

  /*
   * Error Toast
   */
  error: ({text1}) => (
    <View
      style={{
        width: 'auto', 
        height: 40,
        backgroundColor: '#FF5252',
        borderRadius: 20,
        flexDirection: 'row', 
        alignItems: 'center',
        paddingHorizontal: 15,
        justifyContent: 'center',
      }}>
      <Icon name="times-circle" size={28} color="white" /> {/* Error icon */}
      <Text style={{color: 'white', marginLeft: 10, fontFamily: fonts.medium}}>
        {text1}
      </Text>
    </View>
  ),

  /*
   * Info Toast
   */
  info: ({text1}) => (
    <View
      style={{
        width: 'auto',
        height: 40,
        backgroundColor: '#2196F3',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
      }}>
      <Icon name="info-circle" size={28} color="white" /> {/* Info icon */}
      <Text style={{color: 'white', marginLeft: 10, fontFamily: fonts.medium}}>
        {text1}
      </Text>
    </View>
  ),
};

export {toastConfig};