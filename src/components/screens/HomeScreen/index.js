import React, { useState, useEffect } from 'react';
import { View, Text , Button, Pressable, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WakingHoursDialog from './DailogueScreen/WakingHoursDialog';
import { primaryColor } from '../../../includes/variable';
import MoodList from './MoodList';
import { useDispatch, useSelector } from 'react-redux';
import { addMood } from '../../../database/localdb';
import { loadMoods } from '../../../redux/moodSlice';
import * as database from '../../../database/localdb';
import MoodInfo from '../../MoodInfo';

const HomeScreen = ({ navigation, route}) => {
  const [showWakingHoursDialog, setShowWakingHoursDialog] = useState(false);
  const [wakingHours, setWakingHours] = useState('');

  //const [moods, setWakingHours] = useState('');
  const dispatch = useDispatch();
  
  // useEffect(() => {
  //   // Check if the waking hours have been set before
  //   AsyncStorage.getItem('wakingHours')
  //     .then(storedWakingHours => {
        
  //       if (!storedWakingHours) {
  //         setShowWakingHoursDialog(true);
  //       } else {
  //         setWakingHours(storedWakingHours);
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error retrieving waking hours:', error);
  //     });

  //     // (async () => {
  //     //   const data = await database.readMood();
  //     //   dispatch(loadMoods(data));
  //     //  // SplashScreen.hideAsync();
  
  //     // })();
      
  // }, []);



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
    // initialize the database
    (async () => {
        try {
            await database.init();
           
            // await localDB.removeAll('Activities');
            // await localDB.removeAll('Moodtype');
            // await localDB.removeAll('Mood');
            //await localDB.destroy('Activities');
            // await localDB.destroy('Moodtype');
            // await localDB.destroy('Mood');
            //console.log('DB Success!');

            // load activities from the local db
            const data = await database.readMood();
            dispatch(loadMoods(data));
           
        }
        catch (error) {
            console.log('DB Error:', error);
        }
    })();
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

  const moodData = useSelector(
    (state) => {
        return state.mood.moods;
    });

  const handleCancel = () => {
    setShowWakingHoursDialog(false);
  };


  return (
    <View style={{ flex:1, paddingTop: 10, paddingRight:10, paddingLeft: 10, paddingBottom: 10}}>
      {/* {showWakingHoursDialog ? (
        <WakingHoursDialog onSave={handleSaveWakingHours} onCancel={handleCancel} />
      ) : (
        <View style={{flex:1,flexDirection:'row', justifyContent:'space-between',alignItems:'stretch'}}>
          
          <Text style={{paddingHorizontal:10,paddingTop:12,fontSize:15}} >Waking Hours: {wakingHours}</Text>
          
          <Pressable style={{paddingHorizontal:10,paddingTop:12,fontSize:15}} onPress={handleEditWakingHours}>
                    <Text style={{fontSize:15, color: primaryColor, fontWeight:'bold'}}>Change Waking Hours</Text>
          </Pressable>
        </View>
      )} */}
       {/* <View style={{flex:14,flexDirection:'column', justifyContent:'flex-start',alignItems:'stretch'}}> */}
          
          
              <MoodInfo moodData={moodData}/>
         
          <MoodList moods={moodData} navigation={navigation}/>
        </View>
    // </View>
  );
};

export default HomeScreen;
