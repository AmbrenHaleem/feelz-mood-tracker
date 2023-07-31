import React, { useState , useEffect} from 'react';
import { View, Text, Button, StyleSheet, Modal, Dimensions, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';

const WakingHoursDialog = ({ onSave, onCancel }) => {
  const [wakingHours, setWakingHours] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);



  useEffect(() => {
    // Request permissions for notifications
    registerForPushNotificationsAsync();

    // Listener for handling incoming notifications while the app is in the foreground
    const foregroundNotificationListener = Notifications.addNotificationReceivedListener(handleForegroundNotification);

    return () => {
      // Clean up the listener
      foregroundNotificationListener.remove();
    };
  }, []);

  const handleForegroundNotification = (notification) => {
    // Handle incoming notifications while the app is in the foreground
    console.log('Received foreground notification:', notification);
  };

  const registerForPushNotificationsAsync = async () => {
    // Request permissions for notifications
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== 'granted') {
      // Permissions not granted, handle accordingly
      console.log('Notification permissions not granted!');
      return;
    }

    // Get the device's push notification token
    const { data: { data } } = await Notifications.getExpoPushTokenAsync({
      projectId: '@AmbrenHaleem/feelz-mood-tracker',
    });

    // Save the token to your server/database for sending push notifications
    console.log('Expo push token:', data);
  };



  const scheduleLocalNotification = async (alarmTime) => {
    // Schedule a local notification using expo-notifications
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Wake Up!',
        body: 'It is time to wake up!',
      },
      trigger: {
        hour: alarmTime.getHours(),
        minute: alarmTime.getMinutes(),
        repeats: false,
      },
    });
  };



  const handleSave = async () => {
    const alarmTime = new Date();
    alarmTime.setHours(wakingHours.getHours());
    alarmTime.setMinutes(wakingHours.getMinutes());

    // Schedule a local notification
    await scheduleLocalNotification(alarmTime);

    onSave(formatTime(wakingHours));
  };

  const formatTime = (time) => {
    let hours = time.getHours();
    let period = hours < 12 ? 'AM' : 'PM';
    hours = hours % 12 || 12; 
    const minutes = time.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
  };
  

  const showPicker = () => {
    setShowTimePicker(true);
  };

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setWakingHours(selectedTime);
    }
  };

 const handleClose = () => {
  onCancel(); 
};

  return (
    <View>
      <Modal visible={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Please define your waking hours:</Text>
            <View style={styles.timeInputContainer}>
              <Button title={formatTime(wakingHours)} onPress={showPicker} />
              {showTimePicker && (
                <DateTimePicker
                  value={wakingHours}
                  mode="time"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleTimeChange}
                  minuteInterval={1}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={handleClose} color="#FF0000" />
              <Button title="Save" onPress={handleSave} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    width: Dimensions.get('window').width - 40,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default WakingHoursDialog;