
import { View, Text, Switch, Pressable, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
// import { changeStatus, deleteMood } from '../../../../redux/moodSlice';
import styles from './styles';

export default function MoodItem({id, mood, activity, contact, detail, moodDatetime}) {
   
    const dispatch = useDispatch();

    return (
        <View style={styles.card} >
            <View style={styles.textContainer}>
                <View>
                    <Text style={styles.title}>{moodDatetime}</Text>
                    <Text style={styles.mood}> Feeling {mood}  </Text>
                    <Text style={styles.description}> {activity} - {detail} </Text>
                    
                </View>
            </View>

        </View>
        
    )
}
