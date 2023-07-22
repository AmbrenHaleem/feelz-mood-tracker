import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  AddMood  from './AddMood/index';
import  AddActivity  from './AddActivity/index';
import  AddMoodType  from './AddMoodType/index';
const Stack = createNativeStackNavigator();

export default function MoodsScreen({navigation,route}) {
  console.log('navigation',navigation);
    return (
    <Stack.Navigator>
      <Stack.Screen name="AddMood" options={{ headerShown: false}} >
        {(props) => (
            <AddMood {...props} />
        )}
       
        </Stack.Screen>
      <Stack.Screen name="AddMoodType" options={{ title: 'Add a New Mood Type'}} >
        {(props) => (
            <AddMoodType {...props} />
        )}
        </Stack.Screen>
      <Stack.Screen name="AddActivity" options={{ title: 'Add a New Activity' }} >
        {(props) => (
            <AddActivity {...props} />
        )}
        </Stack.Screen>
    </Stack.Navigator>
    );
}
