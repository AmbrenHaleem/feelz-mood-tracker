import React, { useState } from 'react';
import { Alert, View, Text, TextInput, Button, StyleSheet, Modal, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
const WakingHoursDialog = ({ onSave, onCancel }) => {

  const [wakingHours, setWakingHours] = useState('');
  const [selectedAmPm, setSelectedAmPm] = useState('AM');

  const handleSave = () => {
    if (!isValidTimeFormat(wakingHours)) {
      Alert.alert('Invalid Input', 'Please enter waking hours in the format "1:00" to "12:59"');
      return;
    }

    onSave(wakingHours + ' ' + selectedAmPm);
  };

  const isValidTimeFormat = (time) => {
    const pattern = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/;
    return pattern.test(time);
  };


  return (
    <View>
        <Modal visible= {true} animationType="slide">
            <View style={styles.modalContainer}>

            <View style={styles.contentContainer}>
            <Text style={styles.title}>Please define your waking hours:</Text>
            <View style={styles.timeInputContainer}>
            <TextInput
              value={wakingHours}
              onChangeText={setWakingHours}
              placeholder="e.g. 5:30"
              style={styles.input}
              keyboardType="default"
              maxLength={5} 
            />
            <Picker
              selectedValue={selectedAmPm}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedAmPm(itemValue)}
            >
              <Picker.Item label="AM" value="AM" />
              <Picker.Item label="PM" value="PM" />
            </Picker>
          </View>
            <Button style={styles.buttonContainer} title="Save" onPress={handleSave} />
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
    justifyContent: 'space-between', // Added to align TextInput and Picker horizontally
    marginBottom: 10, // Added to give some space below the time input
  },
  input: {
    flex: 1,
    height: 40,
    marginRight: 10, // Added to create space between TextInput and Picker
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
  },
  picker: {
    width: 80,
    height: 40,
  },
});

export default WakingHoursDialog;
