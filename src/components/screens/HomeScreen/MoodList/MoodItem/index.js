
import { View, Text, Switch, Pressable, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
// import { changeStatus, deleteMood } from '../../../../redux/moodSlice';
import styles from './styles';

export default function MoodItem({id, mood, activity, contact, detail, moodDatetime}) {
   
    const dispatch = useDispatch();

    // const handleStatusChange = async () => {

    //     const data = {
    //         status: !status,
    //         id: id
    //     };
    //     dispatch(changeStatus(data));

    //     const updated = await database.update(id, { status: !status});
    //     // console.log('updated:', updated);

    //     if(!updated) {
    //         const data = {
    //             status: status,
    //             id: id
    //         };
    //         dispatch(changeStatus(data));
    //         Alert.alert('Error','There is an error trying to update the data');
    //     }
    // }
    // const handleDeletePress = () => {
    //     Alert.alert(
    //         'Delete Mood',
    //         `The action will delete the mood ${title}.\n\nAre you sure?`,
    //         [
    //             {
    //                 text:'Yes',
    //                 onPress: async () => {
    //                     dispatch(deleteMood(id));
    //                     const deleted = await database.remove(id);
    //                     if(!deleted){
    //                         Alert.alert('Error', 'There was an error trying to delete');
    //                     }
    //                 }
    //             },
    //             {
    //                 text: 'No'
    //             }
    //         ]
    //     )
    //    // onActivityDelete();
    // }

    // const handleLabelPress = () => {
    //     onStatusChange(!status,id);
    // }
    return (
        <View style={styles.card} >
            <View style={styles.textContainer}>
                <View>
                    <Text style={styles.title}> {mood} </Text>
                    <Text style={styles.description}> {activity} - {detail} </Text>
                    <Text style={styles.description}> {moodDatetime} </Text>
                </View>
            </View>

            {/* <View style={styles.buttons}>
                <View style={styles.switch}> 
                    <Switch 
                    value={status} 
                    onValueChange={handleStatusChange}
                    />
                    <Pressable onPress={handleStatusChange}>
                    <Text style={styles.switchText}> {status ? 'Completed' : 'Pending'} </Text>  
                    </Pressable>
                </View>
                <MaterialIcons.Button
                name="delete-sweep" 
                size={24} 
                color="#cc0000" 
                backgroundColor='transparent'
                underlayColor = '#ffdddd'
                onPress = {handleDeletePress} >
                    Delete
                </MaterialIcons.Button>
            </View> */}
        </View>
        
    )
}
