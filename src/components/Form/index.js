import { useState, useEffect } from 'react';
import { View, Text, TextInput, Keyboard, Pressable, ActivityIndicator,TouchableOpacity, ScrollView,Alert, Button } from 'react-native';
import styles from './styles';
import { primaryColor } from '../../includes/variable';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';
import * as localDB from '../../database/localdb';
import { useSelector, useDispatch } from 'react-redux';
import { addActivity, clearActivity } from '../../redux/activitySlice';
import { addMoodType, clearMoodType } from '../../redux/moodTypeSlice';
import { addMood } from '../../redux/moodSlice'
import { format } from 'date-fns';
import * as Contacts from 'expo-contacts';

export default function Form() {
    let [err, setError] = useState();
    const navigation = useNavigation();
    const [selectedMood, setSelectedMood] = useState('');
    const [moodTypes, setMoodTypes] = useState([]);
    const [moods, setMoods] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState('');
    const [activities, setActivities] = useState([]);
    
    const [selectedContact, setSelectedContact] = useState('');
    const [contactList, setContactList] = useState([]);

    const [errorMessages, setErrorMessages] = useState([]);
    const [detail, setDetail] = useState('');
    const [savingDate, setSavingData] = useState(false);

    const dispatch = useDispatch();

    // const moodData = useSelector(
    //     (state) => {
    //         return state.mood.moods;
    //     });

      // tag
      const [tag, setTag] = useState('');
      const [tags, setTags] = useState([]);
  
      const handleTagChange = (text) => {
        setTag(text);
      };
    
      const handleAddTag = () => {
        if (tag.trim() !== '') {
          setTags([...tags, tag]);
          setTag('');
        }
      };

      const handleRemoveTag = (index) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1);
        setTags(updatedTags);
      };
    
    const handleDetailChange = (value) => {
        setDetail(value);
    }

    const handleAddActivityButtonPress = () => {
        navigation.navigate('AddActivity')
    }
    const handleAddMoodTypeButtonPress = () => {
        navigation.navigate('AddMoodType')
    }
    const handleClearButtonPress = () => {
        setMoodTypes([]);
        setActivities([]);
        setContactList([]);
        setDetail('')
        setErrorMessages([]);
        setTags([]);
    }
    
    const handleAddMoodButtonPress = async () => {
        try {
            const validate = [];

            // validate the data
            if (selectedMood === '') {
                validate.push('Mood is required.');
            }
            if (selectedActivity === '') {
                validate.push('Activity is required.');
            }
            // if (selectedContact === '') {
            //     validate.push('Contact is required.');
            // }
            if (detail === '') {
                validate.push('Detail is required.');
            }
            if (validate.length > 0) {
                setErrorMessages(validate);
            }
            else {

                const data = {
                    mood : selectedMood,
                    activity: selectedActivity,
                    contact: selectedContact,
                    detail: detail,
                    moodDatetime: format(new Date(),'iii LLL dd, yyyy h:mma'),
                    tags: tags.join(',')
                }
                console.log("New Mood Data : ", data);
                setSavingData(true);
                const newMoodEntry = await localDB.addMood(data.mood,data.activity,data.contact,data.detail,data.moodDatetime, data.tags);
                setSavingData(false);
                const newMoods = [
                    newMoodEntry,
                    ...moods
                ]
                setMoods(newMoods);

              //  dispatch(addMood(newMoodEntry));

                if (newMoodEntry) {
                    Alert.alert("Mood added successfully.");
                    dispatch(addMood(newMoodEntry));
                    setMoodTypes([]);
                    setActivities([]);
                //    setContactList([]);
                    setDetail('')
                    setErrorMessages([]);
                    setTags([]);
                    Keyboard.dismiss();
                    navigation.goBack();
                }
            }
        }
        catch (err) {
            console.error(err)
        }
    }
    // const moodData = [
    //     { key: '1', value: 'Sad' },
    //     { key: '2', value: 'Happy' },
    //     { key: '3', value: 'Angry' },
    // ]

    //const activityData = [];
    //     {key:'1', value:'Play'},
    //     {key:'2', value:'Read'},
    //     {key:'3', value:'Sleep'},
    // ]
   
    useEffect(() => {
        
        // initialize the database
        (async () => {
            try {
               // await localDB.init();
               
                // await localDB.removeAll('Activities');
                // await localDB.removeAll('Moodtype');
                // await localDB.removeAll('Mood');
                //await localDB.destroy('Activities');
                // await localDB.destroy('Moodtype');
                // await localDB.destroy('Mood');
                //console.log('DB Success!');

                // load activities from the local db
                const activitiesData = await localDB.readActivities();
                dispatch(clearActivity());
                let activityData = activitiesData.map((item) => {
                    dispatch(addActivity(item));
                });
               
                 // load activities from the local db
                 const moodTypesData = await localDB.readMoodType();
                 dispatch(clearMoodType());
                 let moodTypeData = moodTypesData.map((item) => {
                    dispatch(addMoodType(item));
                 });
            }
            catch (error) {
                console.log('DB Error:', error);
            }
        })();

        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
              const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.Emails],
              });
      
              if (data.length > 0) {
                const contacts = data.map((item) => {
                   return { 
                        key : item.id,
                        value : item.name
                   }
                });
                setContactList(contacts);
              }
            }
          })();
    },[])

    const activityData = useSelector(
    (state) => { 
        return state.activity.activities;
    }).map((item) => {
        return {
            key: item.id,
            value: item.activity
        }
    });

    const moodTypeData = useSelector(
        (state) => { 
            return state.moodType.moodTypes;
        }).map((item) => {
            return {
                key: item.id,
                value: item.moodType
            }
        });

    return (
        <ScrollView >
             {errorMessages.length > 0 && (
                    <View style={styles.errorMessage.container}>
                        <Text style={styles.errorMessage.label}> Invalid Data:</Text>
                        {errorMessages.map((message, index) => (
                            <Text key={index} style={styles.errorMessage.text}>
                                - {message}
                            </Text>
                        )
                        )}
                    </View>
                )}
            <View style={styles.container}>
                <Text style={styles.dateTimeLabel}>{format(new Date(),'iii LLL dd, yyyy h:mma')}</Text>

                <View style={[styles.selectlist.container,
                    //  {position :'absolute', paddingTop:65, paddingLeft:40, zIndex:3}
                     ]}>
                    <View style={styles.selectlist.list} >
                        <SelectList placeholder='Select Mood'
                            setSelected={(val) => setSelectedMood(val)}
                            data={moodTypeData}
                            save="value"
                            maxHeight = '120'
                        />
                    </View>
                    <Pressable style={styles.selectlist.button} onPress={handleAddMoodTypeButtonPress}>
                        <Text style={styles.button.text}>+</Text>
                    </Pressable>
                </View>

                <View style={[styles.selectlist.container, 
                    // {position :'absolute', paddingTop:130, paddingLeft:40, zIndex:2}
                    ]}>
                    <View style={styles.selectlist.list} >
                        <SelectList placeholder='Select Activity'
                            setSelected={(val) => setSelectedActivity(val)}
                            data={activityData}
                            save="value"
                            maxHeight = '120'
                        />
                    </View>
                    <Pressable style={styles.selectlist.button} onPress={handleAddActivityButtonPress}>
                        <Text style={styles.button.text}>+</Text>
                    </Pressable>
                </View>
                <View style={[styles.selectlist.container, 
                    // {position :'absolute', paddingTop:195, paddingLeft:40, zIndex:1}
                    ]}>
                    <View style={styles.selectlist.list} >
                        <SelectList placeholder='Select Contact'
                                setSelected={(val) => setSelectedContact(val)}
                                data={contactList}
                                save="value"
                                maxHeight = '120'   
                        />
                    </View>
                </View>

                {/* <Text style={styles.label}>Description:</Text> */}
                <TextInput
                    maxLength={150}
                    style={styles.detailTextbox}
                    numberOfLines={4}
                    onChangeText={handleDetailChange}
                    placeholder='Enter details or contacts manually...'
                    value = {detail}
                    multiline
                />
            {/* <View style={styles.containers}> */}
                        <View style={styles.tagContainer}>
                            <TextInput
                            value={tag}
                            onChangeText={handleTagChange}
                            placeholder="Enter a tag"
                            style={styles.tagTextbox}
                            />
                            {/* <Button  title="Add Tag" onPress={handleAddTag} color={styles.primaryColor} /> */}

                            <Pressable style={styles.selectlist.button} onPress={handleAddTag}>
                                <Text style={styles.button.text}>Add Tag</Text>
                            </Pressable>
                        </View>

                        <ScrollView horizontal>
                            <View style={styles.tagsContainer}>
                                {tags.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.tag}
                                    onPress={() => handleRemoveTag(index)}
                                >
                                    <Text style={styles.tagText}>{item}</Text>
                                </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                {/* </View> */}

                <Pressable style={styles.button.container} onPress={handleAddMoodButtonPress}>
                    <Text style={styles.button.text}>Add Mood</Text>
                </Pressable>
                {/* <Pressable style={styles.button.container} onPress={handleClearButtonPress}>
                    <Text style={styles.button.text}>Clear</Text>
                </Pressable> */}
            </View>
        </ScrollView>
    );

}