import { Text,View, TextInput,Pressable, ScrollView,ActivityIndicator } from 'react-native';
import { useState } from 'react';
import styles from './styles';
import { primaryColor } from '../../../../includes/variable';
export default function AddMoodType({navigation}){
    const [moodType, setMoodType] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);
    const [savingDate, setSavingData] = useState(false);

    const handleMoodTypeChange = (value) => {
        setMoodType(value);
      }

      const handleAddPress = async () => {
        try{
            const validate = [];
    
            // validate the data
            if (moodType === ''){
                validate.push('Mood Type is required.');
            }
            if (validate.length > 0) {
                setErrorMessages(validate);
            }
            else {
             
                const data = {
                  moodType : moodType,
                }
                //console.log("Add data : ", data);
                setSavingData(true);
                const id = await database.save(data);
                setSavingData(false);
    
                if (id){
                  //  props.onAddItem(id, itemDescription, itemQuantity,itemCost,purchaseDate,expiryDate);
                   
                    setMoodType('');
                    setErrorMessages([]);
                    Keyboard.dismiss();
                   // props.navigation.goBack();
                }
            }
        }
        catch(err){
            console.error(err)
        }
    }

    if (savingDate){
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size = 'large' color = {primaryColor}/>
                <Text style={styles.loadingText}> Saving data!</Text>
                <Text style={styles.loadingText}> Please, wait...</Text>
            </View>
        );
      }
return (
    <ScrollView>
    <View style={styles.container}>

      {errorMessages.length > 0 && (
        <View style={styles.errorMessage.container}>
        <Text style={styles.errorMessage.label}> Invalid Data:</Text>
        {errorMessages.map((message,index) => (
             <Text key={index} style={styles.errorMessage.text}>
             - {message}
             </Text>
        )
        )}
        </View>
      )}
    <View style={styles.container}>
            <Text style={styles.label}>Mood Type:</Text>
      <TextInput
        maxLength={150}
        onChangeText={handleMoodTypeChange}
        defaultValue={moodType}
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