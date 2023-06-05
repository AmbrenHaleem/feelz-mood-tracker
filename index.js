import { useState, useEffect } from 'react';
import { View, Text, TextInput, Keyboard, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import styles from './styles';
import { primaryColor } from '../../includes/variable';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';
import * as localDB from '../../database/localdb';



export default function Form() {
    let [err, setError] = useState();
    const navigation = useNavigation();
    const [selectedMood, setSelectedMood] = useState('');
    const [selectedActivity, setSelectedActivity] = useState('');
    const [activities, setActivities] = useState([]);
    const [selectedContact, setSelectedContact] = useState('');
    const [contactList, setContactList] = useState([]);
    const [contacts, setContacts] = useState([]);
    const handleAddActivityButtonPress = () => {
        navigation.navigate('AddActivity')
    }
    const handleAddMoodTypeButtonPress = () => {
        navigation.navigate('AddMoodType')
    }
    const handleAddMoodButtonPress = () => {
        console.log('Mood Saved');
    }
    const moodData = [
        { key: '1', value: 'Sad' },
        { key: '2', value: 'Happy' },
        { key: '3', value: 'Angry' },
    ]

    //const activityData = [];
    //     {key:'1', value:'Play'},
    //     {key:'2', value:'Read'},
    //     {key:'3', value:'Sleep'},
    // ]
    useEffect(() => {
        
        // initialize the database
        (async () => {
            try {
                await localDB.init();
                //await localDB.destroy();
                //await localDB.removeAll();
                //console.log('DB Success!');

                // load from the local db
                const data = await localDB.read();

                let activityData = data.map((item) => {
                    return {
                        key: item.id,
                        value: item.activity
                    }
                });
                setActivities(activityData);
                //console.log('Added Data:',activityData);
            }
            catch (error) {
                console.log('DB Error:', error);
            }
        })();
    })
    const fetchContacts = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: 'Contacts Permission',
              message: 'This app needs access to your contacts.',
            }
          );
    
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Contacts.getAll((err, contactList) => {
              if (err) {
                console.log('Error fetching contacts:', err);
              } else {
                const formattedContacts = contactList.map((contact) => ({
                  key: contact.recordID,
                  value: contact.displayName,
                }));
                setContacts(formattedContacts);
              }
            });
          } else {
            console.log('Contacts permission denied');
          }
        } catch (error) {
          console.log('Error requesting contacts permission:', error);
        }
      };


      const handleFetchContactsButtonPress = () => {
        fetchContacts();
      };
    

    

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.dateTimeLabel}>{new Date().toLocaleString()}</Text>

                <View style={styles.selectlist.container}>
                    <View style={styles.selectlist.list} >
                        <SelectList placeholder='Select Mood'
                            setSelected={(val) => setSelectedMood(val)}
                            data={moodData}
                            save="value"
                        />
                    </View>
                    <Pressable style={styles.selectlist.button} onPress={handleAddMoodTypeButtonPress}>
                        <Text style={styles.button.text}>+</Text>
                    </Pressable>
                </View>

                <View style={styles.selectlist.container}>
                    <View style={styles.selectlist.list} >
                        <SelectList placeholder='Select Activity'
                            setSelected={(val) => setSelectedActivity(val)}
                            data={activities}
                            save="value"
                        />
                    </View>
                    <Pressable style={styles.selectlist.button} onPress={handleAddActivityButtonPress}>
                        <Text style={styles.button.text}>+</Text>
                    </Pressable>
                </View>
                <View style={styles.selectlist.container}>
                <View style={styles.selectlist.list} >
                  <TextInput 
                  style={styles.selectlist.textInput}
                   placeholder= 'Select Contact'
                   value={selectedContact}
      onChangeText={setSelectedContact}
      />
                </View>
                <Pressable style={styles.selectlist.button} onPress={handleFetchContactsButtonPress}>
                    <Text style={styles.button.text}>+</Text>
                </Pressable>
            </View>

                <Text style={styles.label}>Description:</Text>
                <TextInput
                    maxLength={150}
                    style={styles.multilineTextbox}
                    multiline numberOfLines={4}
                    placeholder='Enter Contact Details'
                />
                <Pressable style={styles.button.container} onPress={handleAddMoodButtonPress}>
                    <Text style={styles.button.text}>Add Mood</Text>
                </Pressable>
            </View>


        </ScrollView>


    );

}