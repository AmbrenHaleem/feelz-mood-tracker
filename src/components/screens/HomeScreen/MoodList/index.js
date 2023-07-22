import { View, Text, ScrollView, Pressable } from 'react-native';
import MoodItem from './ActivityItem';
import styles from './styles';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function MoodList( {moods, navigation, route}) {
console.log("Moods : ", moods);

    
    const handleAddMoodPress = () => {
        navigation.navigate('Add');
    }

    const handleMoodPress = (mood) => {
        navigation.navigate('Detail', mood);
    }
    const handleGoBackPress = () => {
        // navigation.goBack();
        // navigation.pop(3);
        navigation.popToTop();
    }
    return (
        <>
        <ScrollView>
            {moods.map((mood, index) => {
                return (
                    <Pressable key={index} onPress={() => handleMoodPress(mood)}>
                     
                    <MoodItem
                        //key={index}
                        {...mood}
                    />
                       
                    </Pressable>
                  )
                })}
                <View style={{height:90}}></View>
        </ScrollView>

        {/* <View style={styles.addButtonContainer}>
            <Pressable onPress={handleAddMoodPress}>
                <Text style={styles.addButtonText}>+</Text>
            </Pressable>
        </View> */}
            {/* {navigation.canGoBack() && (
                <Pressable onPress={handleGoBackPress}>
                    <Text> Go back</Text>
                </Pressable>
            )} */}
        </>
    )
}
