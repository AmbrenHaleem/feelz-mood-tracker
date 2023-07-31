import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import { AntDesign } from '@expo/vector-icons';
import { primaryColor } from "../../includes/variable";
import { Entypo } from '@expo/vector-icons';
import { Title, Paragraph, Card, Button, TextInput } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    maxHeight: 300,
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:20,
    marginTop:20
  },
  itemContainer: {
    borderWidth:1,
    borderColor: 'rgba(0,0,0,0.2)',
    padding:10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius:20,
    backgroundColor: '#fbefff',
    marginTop: 10,
  },
  moodText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: primaryColor,
    flex: 1,
  },
  percentageText: {
    marginLeft: 10,
  },
  SummaryContainer: {
    maxHeight: 300,
    padding:0
  },
});

export default function MoodInfo({ moodData }) {

  const [selectedAnalysis, setSelectedAnalysis] = useState("weekly");

  const handleWeeklyAnalysis = () => {
    setSelectedAnalysis("weekly");
  };

  const handleMonthlyAnalysis = () => {
    setSelectedAnalysis("monthly");
  };

  const getWeeklyMoodPercentages = () => {
    const currentWeekStart = moment().startOf("week");
    const currentWeekEnd = moment().endOf("week");

    const weeklyMoodCounts = {};
    moodData.forEach((item) => {
      const moodDatetime = moment(item.moodDatetime, "ddd MMM DD, YYYY hh:mmA", "en");
      if (moodDatetime.isBetween(currentWeekStart, currentWeekEnd, null, "[]")) {
        if (weeklyMoodCounts[item.mood]) {
          weeklyMoodCounts[item.mood]++;
        } else {
          weeklyMoodCounts[item.mood] = 1;
        }
      }
    });

    const totalWeeklyMoods = Object.values(weeklyMoodCounts).reduce((acc, count) => acc + count, 0);

    const weeklyMoodPercentages = {};
    for (const mood in weeklyMoodCounts) {
      const percentage = (weeklyMoodCounts[mood] / totalWeeklyMoods) * 100;
      weeklyMoodPercentages[mood] = `${percentage.toFixed(0)}%`;
    }

    return weeklyMoodPercentages;
  };

  const getMonthlyMoodPercentages = () => {
    const currentMonthStart = moment().startOf("month");
    const currentMonthEnd = moment().endOf("month");

    const monthlyMoodCounts = {};
    moodData.forEach((item) => {
      const moodDatetime = moment(item.moodDatetime, "ddd MMM DD, YYYY hh:mmA", "en");
      if (moodDatetime.isBetween(currentMonthStart, currentMonthEnd, null, "[]")) {
        if (monthlyMoodCounts[item.mood]) {
          monthlyMoodCounts[item.mood]++;
        } else {
          monthlyMoodCounts[item.mood] = 1;
        }
      }
    });

    const totalMonthlyMoods = Object.values(monthlyMoodCounts).reduce((acc, count) => acc + count, 0);

    const monthlyMoodPercentages = {};
    for (const mood in monthlyMoodCounts) {
      const percentage = (monthlyMoodCounts[mood] / totalMonthlyMoods) * 100;
      monthlyMoodPercentages[mood] = `${percentage.toFixed(0)}%`;
    }

    return monthlyMoodPercentages;
  };

  const renderAnalysisList = () => {
    if (selectedAnalysis === "weekly") {
      const weeklyMoodPercentages = getWeeklyMoodPercentages();
      if (Object.keys(weeklyMoodPercentages).length === 0) {
        return <View style={{display:"flex",justifyContent:"center",alignItems:"center",paddingBottom:20,paddingTop:20}}><Text>No data available to show</Text></View>;
      }

      return (
        <ScrollView style={styles.container}>
          {Object.entries(weeklyMoodPercentages).map(([mood, percentage]) => (
            <View style={styles.itemContainer} key={mood}>
              <Text style={styles.moodText}>{mood}</Text>
              <Text style={styles.percentageText}>{percentage}</Text>
            </View>
          ))}
        </ScrollView>
      );
    } else if (selectedAnalysis === "monthly") {
      const monthlyMoodPercentages = getMonthlyMoodPercentages();
      if (Object.keys(monthlyMoodPercentages).length === 0) {
        return <View style={{display:"flex",justifyContent:"center",alignItems:"center",paddingBottom:20,paddingTop:20}}><Text>No data available to show</Text></View>;
      }

      return (
        <ScrollView style={styles.container}>
          {Object.entries(monthlyMoodPercentages).map(([mood, percentage]) => (
            <View style={styles.itemContainer} key={mood}>
              <Text style={styles.moodText}>{mood}</Text>
              <Text style={styles.percentageText}>{percentage}</Text>
            </View>
          ))}
        </ScrollView>
      );
    }
  };

  return (
    <Card style={{margin:10, backgroundColor:'#fff3c9', maxHeight:230}}>
        <Card.Content>
        <ScrollView style={styles.SummaryContainer}>
          {/* <Title>Add ToDo Here</Title> */}
    {/* <View style={{backgroundColor:'#fff3c9',paddingTop:10,borderRadius:20,borderWidth:1,
    borderColor: 'rgba(0,0,0,0.2)',}}> */}
      <View style={{display:"flex",flexDirection:'row',justifyContent:"center",alignItems:"center",marginBottom:20}}>
      <Text style={{color:primaryColor,fontSize:28}}>Your Summary</Text>
      <View style={{paddingHorizontal:4}}>
        <Entypo name="emoji-happy" size={29} color="magenta" />
      </View>
      </View>
      <View style={{ display: "flex", width: '100%', justifyContent: "space-around", alignItems: "center", flexDirection: 'row' }}>
        {/* <TouchableOpacity onPress={() => {
                        handleWeeklyAnalysis()
                    }} style={{ backgroundColor:primaryColor, borderRadius: 10, padding: 10, marginTop: 60,width:80,display:'flex',justifyContent:'center',alignItems:'center' }}>
                        <Text style={{color:"#fff"}}>
                        weekly
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        handleMonthlyAnalysis()
                    }} style={{ backgroundColor:primaryColor, borderRadius: 10, padding: 10, marginTop: 60,width:80,display:'flex',justifyContent:'center',alignItems:'center' }}>
                        <Text style={{color:"#fff"}}>
                        Monthly
                        </Text>
                    </TouchableOpacity> */}


        <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
          <TouchableOpacity onPress={() => {
            handleWeeklyAnalysis()
          }}>
            {selectedAnalysis === 'weekly' ? <AntDesign name="checksquareo" size={24} color="#000" /> : <View style={{ width: 20, height: 20, borderColor: "#000", borderWidth: 2 }}></View>}
          </TouchableOpacity>
          <Text style={{ color: "#000", marginLeft: 10 }}>Weekly</Text>
        </View>

        <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
          <TouchableOpacity onPress={() => {
            handleMonthlyAnalysis()
          }}>
            {selectedAnalysis === 'monthly' ? <AntDesign name="checksquareo" size={24} color="#000" /> : <View style={{ width: 20, height: 20, borderColor: "#000", borderWidth: 2 }}></View>}
          </TouchableOpacity>
          <Text style={{ color: "#000", marginLeft: 10 }}>Monthly</Text>
        </View>

      </View>

      {renderAnalysisList()}
    {/* </View> */}
    </ScrollView>
    </Card.Content>
    </Card>
    
  );
}
