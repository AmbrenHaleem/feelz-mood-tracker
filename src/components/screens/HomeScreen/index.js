import React, { useState, useEffect } from 'react';
import { View, Text , Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WakingHoursDialog from './DailogueScreen/WakingHoursDialog';
import { primaryColor } from '../../../includes/variable';

const App = () => {
  const [showWakingHoursDialog, setShowWakingHoursDialog] = useState(false);
  const [wakingHours, setWakingHours] = useState('');

  useEffect(() => {
    // Check if the waking hours have been set before
    AsyncStorage.getItem('wakingHours')
      .then(storedWakingHours => {
        if (!storedWakingHours) {
          setShowWakingHoursDialog(true);
        } else {
          setWakingHours(storedWakingHours);
        }
      })
      .catch(error => {
        console.error('Error retrieving waking hours:', error);
      });
  }, []);

  const handleSaveWakingHours = hours => {
    setWakingHours(hours);
    AsyncStorage.setItem('wakingHours', hours)
      .then(() => {
        setShowWakingHoursDialog(false);
      })
      .catch(error => {
        console.error('Error saving waking hours:', error);
      });
  };

  const handleEditWakingHours = () => {
    setShowWakingHoursDialog(true);
  };

  return (
    <View style={{ marginTop: 10, paddingRight:10, paddingLeft: 10, marginBottom: 10 }}>
      {showWakingHoursDialog ? (
        <WakingHoursDialog onSave={handleSaveWakingHours} />
      ) : (
        <View>
          <Text>Welcome to our App</Text>
          <Text style={{ paddingBottom:10}} >Waking Hours: {wakingHours}</Text>
          <Button style={{ backgroundColor: primaryColor}} title="Change Waking Hours" onPress={handleEditWakingHours} />
        </View>
      )}
      
    </View>
  );
};

export default App;
