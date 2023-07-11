import { Text, View, TextInput, Pressable, ScrollView, ActivityIndicator, Keyboard, Alert } from 'react-native';
import { useState } from 'react';
import styles from './styles';
import { primaryColor } from '../../../../includes/variable';
import * as localDB from '../../../../database/localdb'
import { useDispatch, useSelector } from 'react-redux';
import { addActivity } from '../../../../redux/activitySlice';

export default function AddActivity({ navigation, route }) {
    const [activity, setActivity] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);
    const [savingDate, setSavingData] = useState(false);
    const [activities, setActivities] = useState([]);

    const dispatch = useDispatch();

    // useEffect(() => {
    //     // initialize the database
    //     (async () => {
    //         try {
    //             // await localDB.init();
    //             //console.log('DB Success!');
    //             //await localDB.destroy();
    //             // load from the local db
    //             //const activities = await localDB.read();
    //             //setActivities(activities);
    //            // console.log('DB activities data : ', activities);
    //         }
    //         catch (error) {
    //             console.log('DB Error:', error.message);
    //         }
    //     })();
    // }, []);

    const activityData = useSelector(
        (state) => {
            return state.activity.activities;
        });
   
    const handleActivityChange = (value) => {
        setActivity(value);
    }

    const handleAddPress = async () => {
        try {
            const validate = [];

            // validate the data
            if (activity === '') {
                validate.push('Activity is required.');
            }

            activityData.map((item) => {
                if (activity.toLowerCase().trim() === item.activity.toLowerCase().trim()) {
                    validate.push('Activity already exist.');
                }
            });
            if (validate.length > 0) {
                setErrorMessages(validate);
            }
            else {

                const data = {
                    activity: activity,
                }

                setSavingData(true);
                //console.log("Activity going to add ", data.activity);
                const newActivityEntry = await localDB.addActivity(data.activity);
                //console.log('New added activity: ', newActivityEntry);
               
                setSavingData(false);
                const newActivities = [
                    newActivityEntry,
                    ...activities
                ]
                setActivities(newActivities);

                dispatch(addActivity(newActivityEntry));

                if (newActivityEntry) {
                    //  props.onAddItem(id, itemDescription, itemQuantity,itemCost,purchaseDate,expiryDate);
                    Alert.alert("Activity added successfully.");
                    setActivity('');
                    setErrorMessages([]);
                    Keyboard.dismiss();
                    navigation.goBack();
                }
            }
        }
        catch (err) {
            console.error(err)
        }
    }

    // if (savingDate) {
    //     return (
    //         <View style={styles.loadingContainer}>
    //             <ActivityIndicator size='large' color={primaryColor} />
    //             <Text style={styles.loadingText}> Saving data!</Text>
    //             <Text style={styles.loadingText}> Please, wait...</Text>
    //         </View>
    //     );
    // }
    return (
        <ScrollView>
            <View style={styles.container}>

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
                    {/* <Text style={styles.label}>Activity:</Text> */}
                    <TextInput
                        maxLength={150}
                        onChangeText={handleActivityChange}
                        placeholder='Enter activity'
                        defaultValue={activity}
                        style={styles.textbox}
                    />
                    <Pressable style={styles.button.container} onPress={handleAddPress} >
                        <Text style={styles.button.text}>Add</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}