import { Text, View, TextInput, Pressable, ScrollView, ActivityIndicator, Keyboard  } from 'react-native';
import { useState } from 'react';
import styles from './styles';
import { primaryColor } from '../../../../includes/variable';
import * as localDB from '../../../../database/localdb'
import { useDispatch, useSelector } from 'react-redux';
import { addMoodType } from '../../../../redux/moodTypeSlice';

export default function AddMoodType({ navigation }) {
  const [moodType, setMoodType] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [savingDate, setSavingData] = useState(false);
  const [MoodTypes, setMoodTypes] = useState([]);

  const dispatch = useDispatch();

  const moodTypeData = useSelector(
    (state) => {
        return state.moodType.moodTypes;
    });

  const handleMoodTypeChange = (value) => {
    setMoodType(value);
  }

  const handleAddPress = async () => {
    try {
      const validate = [];

      // validate the data
      if (moodType === '') {
        validate.push('Mood Type is required.');
      }
      moodTypeData.map((item) => {
        if (moodType.toLowerCase().trim() === item.moodType.toLowerCase().trim()) {
            validate.push('Mood Type already exist.');
        }
      });
      if (validate.length > 0) {
        setErrorMessages(validate);
      }
      else {

        const data = {
          moodType: moodType,
      }

          setSavingData(true);
          console.log("Mood Type going to add ", data.moodType);
          const newMoodTypeEntry = await localDB.addMoodType(data.moodType);
          //console.log('New added MoodType: ', newMoodTypeEntry);
          setSavingData(false);
          const newMoodTypes = [
              newMoodTypeEntry,
              ...MoodTypes
          ]
          setMoodTypes(newMoodTypes);

          dispatch(addMoodType(newMoodTypeEntry));

          if (newMoodTypeEntry) {
             
              setMoodType('');
              setErrorMessages([]);
              Keyboard.dismiss();
              // props.navigation.goBack();
          }
      }
    }
    catch (err) {
      console.error(err)
    }
  }

  // if (savingDate) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size='large' color={primaryColor} />
  //       <Text style={styles.loadingText}> Saving data!</Text>
  //       <Text style={styles.loadingText}> Please, wait...</Text>
  //     </View>
  //   );
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
          {/* <Text style={styles.label}>Mood Type:</Text> */}
          <TextInput
            maxLength={150}
            onChangeText={handleMoodTypeChange}
            defaultValue={moodType}
            placeholder='Enter Mood Type'
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