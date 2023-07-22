
import { View, Text, Switch, Pressable, Alert, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
// import { changeStatus, deleteMood } from '../../../../redux/moodSlice';
import styles from './styles';
import * as database from '../../../../../database/localdb';
import { useState } from 'react';

export default function MoodItem({id, mood, activity, contact, detail, moodDatetime,tags}) {
   
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
//console.log('Items : ',props.item)
//   const allowDelete = useSelector(
//     (state) => state.preference.allowDelete
//   )
const allowDelete = false;
  const handleModalToggle = () => {
    setShowModal(!showModal);
  }
 //console.log('Props in Item', props);
  const handleRemovePress = () => {
    Alert.alert(
      'Remove Item',
      'This action will permanently delete this item. This action cannot be undone!', [
      {
        text: 'Confirm',
        onPress: async () => {
          //console.log('Removal Id', props.item.id);
          props.onItemRemoval(props.item.id);
          const deleted = await database.remove(props.item.id);
          if(!deleted){
            Alert.alert('Error','There was an error trying to delete item.');
          }
          else{
            setShowModal(false);
          }
        }
      },
      {
        text: 'Cancel'
      }
    ]);
  }
    return (
        <>
        <Pressable onPress={handleModalToggle}>
        <View style={styles.card} >
            <View style={styles.textContainer}>
                <View>
                    <Text style={styles.title}>{moodDatetime}</Text>
                    <Text style={styles.mood}> Feeling {mood}  </Text>
                    <Text style={styles.description}> {activity} - {detail} </Text>
                    
                </View>
            </View>

        </View>
        </Pressable>

        <Modal visible={showModal} transparent={true}>
        <View style={styles.modal.container}>
          <View style={styles.modal.box}>

            {/* Close Modal */}
            <Pressable onPress={handleModalToggle}>
              <View style={styles.close.container}>
                <AntDesign name="closesquare" size={25} color="#c00" />
                <Text style={styles.close.text}>Close</Text>
              </View>
            </Pressable>

            {/* Item Description */}
            <Text style={styles.title}>{moodDatetime}</Text>
            <Text style={styles.text}>Mood: {mood}</Text>
            <Text style={styles.text}>Activity: {activity} - {detail}</Text>
            <Text style={styles.text}>Detail: {detail}</Text>
            <Text style={styles.text}>Contact : {contact == '' ? 'None' : contact } </Text>
            <Text style={styles.text}>Tags: {tags == '' ? 'None' : tags } </Text>
              {/* Remove Button */}
              {allowDelete && (
                <View style={styles.remove.container}>
                  <Pressable onPress={handleRemovePress}>
                    <MaterialIcons name='delete-sweep' size={32} style={styles.remove.icon} />
                    <Text style={styles.remove.label}>Remove</Text>
                  </Pressable>
                </View>
               )} 
            </View>
          </View>
        
      </Modal>
        </>
    )
}
