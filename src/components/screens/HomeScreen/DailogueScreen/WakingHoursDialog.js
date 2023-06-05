import React, { useState } from 'react';
import { Alert, View, Text, TextInput, Button, StyleSheet, Modal, Dimensions } from 'react-native';

const WakingHoursDialog = ({ onSave }) => {

  const [wakingHours, setWakingHours] = useState('');

  const handleSave = () => {
    if (wakingHours.trim() === '') {
      Alert.alert('Error', 'Please enter your waking hours');
      return;
    }

    onSave(wakingHours);
  };

  return (
    <View>
        <Modal visible= {true} animationType="slide">
            <View style={styles.modalContainer}>

            <View style={styles.contentContainer}>
            <Text style={styles.title}>Please define your waking hours:</Text>
            <TextInput
                value={wakingHours}
                onChangeText={setWakingHours}
                placeholder="e.g. 5 AM - 12 AM"
                style={{ marginTop: 10, marginBottom: 10 }}
            /> 
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
    input: {
      width: '100%',
      height: 40,
      borderColor: '#cccccc',
      borderWidth: 1,
      borderRadius: 4,
      paddingLeft: 10,
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
  });

export default WakingHoursDialog;
