import { View, StyleSheet, TouchableOpacity, Text, Alert, Button, ScrollView, RefreshControl, Image, StatusBar, TextInput, Dimensions, Modal } from 'react-native';
import { useState, useEffect, useRef } from "react";
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SelectList } from 'react-native-dropdown-select-list';
import moment from "moment";
import * as localDB from '../../../database/localdb';
import { addMoodType, clearMoodType } from '../../../redux/moodTypeSlice';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addNoti, addTime, getNotis, getUser, getTime } from '../../../utils/storage';
import { primaryColor } from '../../../includes/variable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Entries({ navigation, route }) {
    const [title, setTitle] = useState("");
    const [showAdd, setShowAdd] = useState(false);
    const [showTimed, setShowTimed] = useState(false);
    const [every30Seconds, setEvery30Seconds] = useState(false);
    const [hour, setHour] = useState("");
    const [min, setMin] = useState("");
    const [sleepTime, setSleepTime] = useState(new Date());
    const [showSleepTime, setShowSleepTime] = useState(false);
    const [showWakeupTime, setShowWakeupTime] = useState(false);
    const every30SecondsRef = useRef(false);
    const [wakeupTime, setWakeupTime] = useState(new Date());

    const [moodTypes, setMoodTypes] = useState([]);
    const [selectedMood, setSelectedMood] = useState(null);
    const dispatch = useDispatch();

    const [description, setDescription] = useState("");
    const [cates, setCates] = useState([
        {
            name: "Every 2h",
            value: 2 * 3600
        },
        {
            name: "Every 4h",
            value: 4 * 3600
        },
        {
            name: "Every 6h",
            value: 6 * 3600
        },
        {
            name: "Every 8h",
            value: 8 * 3600
        },
        {
            name: "Every 10h",
            value: 10 * 3600
        },
        {
            name: "Every 12h",
            value: 12 * 3600
        }
    ]);

    const [selectCate, setSelectCate] = useState(cates[0]);

    const [modalVisible, setModalVisible] = useState(false);
    const [noti, setNoti] = useState({
        title: "",
        description: ""
    });

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [searchKey, setSearchKey] = useState('');


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

    const handleConfirm = async () => {
        if (!title) {
            Alert.alert('Please input title!');
            return;
        }
        if (!description) {
            Alert.alert('Please input description!');
            return;
        }
        if (!mood) {
            Alert.alert('Please select a mood!');
            return;
        }
        await addNoti({
            title: title,
            description: description,
            value: selectCate.value,
            time: moment().valueOf(),
            mood: selectedMood,
        });
        Alert.alert('Add Success');
    };

    useEffect(() => {
       

        (async () => {
            await  AsyncStorage.setItem('@notis2', '')
            try {
                await localDB.init();

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

        dealTimes();
    }, []);

    const dealTimes = async () => {
        let time = await getTime();
        if (time) {
            setHour(time.hour);
            setMin(time.min);
        }
        setInterval(async () => {
            let notices = await getNotis();
            let time = await getTime();
            if (time && !showTimed) {
                let now = moment().format("HH:mm");
                if (now == time.sleepTime) {
                    setShowTimed(true);
                    setNoti({
                        title: "Time Notification",
                        description: "Sleep"
                    });
                    setModalVisible(true)
                }
            }
            if (time && !showTimed) {
                let now = moment().format("HH:mm");
                if (now == time.wakeupTime) {
                    setShowTimed(true);
                    setNoti({
                        title: "Time Notification",
                        description: "Wakeup"
                    });
                    setModalVisible(true)
                }
            }

            if (every30SecondsRef.current && time) {
                let wakeupTime = moment(time.wakeupTime).valueOf();
                let sleepTime = moment(time.sleepTime).valueOf();
                let nowTime = moment().valueOf();
                if (nowTime > wakeupTime && nowTime < sleepTime) {
                    if ((wakeupTime - nowTime) % 30000 == 0) {
                        setNoti({
                            title: "Time Notification",
                            description: "Wakeup to Sleep per 30s"
                        });
                        setModalVisible(true)
                    }
                }
            }


        }, 10 * 1000);
        setInterval(async () => {
            let notices = await getNotis();
          //  console.log('notices', notices);
            notices.forEach((item) => {
                if (item?.isEvery30 && every30SecondsRef.current) {
                    setNoti(item);
                    setModalVisible(true)
                    console.log('debug2---');
                    return;
                }
                let dis = Math.floor((moment().valueOf() - item.time) / 1000);
                let leave = dis % item.value;
                if ((leave <= 60 && dis / item.value >= 1) || every30SecondsRef.current) {
                    setNoti(item);
                    setModalVisible(true)
                    console.log('debug---');
                }
            })
        }, 30 * 1000);
    }

    const confirm = async () => {
        if (!title) {
            Alert.alert("Please input title!")
            return;
        }
        if (!description) {
            Alert.alert("Please input description!")
            return;
        }
        if (!selectCate?.value && !every30Seconds) {
            return
        }
        if (every30Seconds) {
            every30SecondsRef.current = true;
            await addNoti({
                title: title,
                description,
                selectedMood: selectedMood || '',
                value: [],
                isEvery30: true,
                time: moment().valueOf()
            })
            Alert.alert("Add Success")
            return;
        }
        await addNoti({
            title: title,
            description,
            selectedMood: selectedMood || '',
            value: selectCate?.value || '',
            time: moment().valueOf()
        })
        Alert.alert("Add Success")
    }

    const add = async () => {
        await addTime({
            sleepTime: moment(sleepTime).format("HH:mm"),
            wakeupTime: moment(wakeupTime).format("HH:mm"),
        })

        setShowAdd(false);
        setShowTimed(false);
        Alert.alert("Add Success!")
    }
    return (
        <View
            style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingTop: 15, marginBottom: 10 }}>
                    {/* <Text style={{ color: "#000", marginBottom: 10 }}>Title</Text> */}
                    <TextInput style={{ backgroundColor: "#fff", borderWidth: 1, height: 45, borderRadius: 10, flex: 1, paddingHorizontal: 10, borderColor: '#747474', paddingVertical:10,fontSize: 15,}} value={title} onChangeText={(t) => {
                        setTitle(t);
                    }} placeholder='Enter notification title'></TextInput>

                </View>

                <View style={{ paddingTop: 15, marginBottom: 1 }}>
                    {/* <Text style={{ color: "#000", marginBottom: 10 }}>Description</Text> */}
                    <TextInput style={{ backgroundColor: "#fff", borderWidth: 1,height: 45, borderRadius: 10, flex: 1, paddingHorizontal:10,  borderColor: '#747474',paddingVertical:10,fontSize: 15,}} numberOfLines={10} value={description} onChangeText={(t) => {
                        setDescription(t);
                    }} placeholder='Enter notification description'>
                    </TextInput>
                </View>

                <View style={{ paddingTop: 0, marginBottom: 0 }}>
                    <Text style={{ color: '#fff', marginBottom: 10 }}>Mood</Text>
                    <View style={styles.container1}>
                        <View style={styles.list} >
                            <SelectList placeholder='Select Mood'
                                setSelected={(val) => setSelectedMood(val)}
                                data={moodTypeData}
                                save="value"
                                maxHeight='120'
                                style={{ color: '#000' }}
                            />
                        </View>
                    </View>

                </View>

                <Text style={{ color: "#fff", marginBottom: 10 }}>Time</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {cates.map((item, i) => <TouchableOpacity key={item.name} onPress={() => {
                        setSelectCate(item);
                        setEvery30Seconds(false);
                    }} style={{ backgroundColor: selectCate == item ? "blue" : primaryColor, marginRight: i % 2 == 0 ? 10 : 0, borderRadius: 5, marginBottom: 10, width: (windowWidth - 40) / 2 }}>
                        <Text style={{ color: "#fff", padding: 10, }}>{item.name}</Text>
                    </TouchableOpacity>)}
                </View>

                <View style={{ flexDirection: "row",marginTop:15 }}>
                    <TouchableOpacity onPress={() => {
                        setEvery30Seconds(!every30Seconds);
                        setSelectCate(null);
                    }}>
                        {every30Seconds ? <AntDesign name="checksquareo" size={24} color="#000" /> : <View style={{ width: 20, height: 20, borderColor: "#000", borderWidth: 2 }}></View>}
                    </TouchableOpacity>
                    <Text style={{ color: "#000", marginLeft: 10 }}>Every 30 Seconds (for testing purposes only)</Text>
                </View>

                <Text style={{ color: "#000", marginBottom: 10, marginTop: 30 }}>Other Settings</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <TouchableOpacity onPress={() => {
                        setShowAdd();
                    }} style={{ backgroundColor: primaryColor, borderWidth: 1, marginRight: 0, borderRadius: 5, marginBottom: 30, width: (windowWidth - 40) / 2 }}>
                        <Text style={{ color: "#fff", padding: 10, }}>Set Working Hours</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => {
                    confirm();
                }} style={{ backgroundColor: primaryColor, alignItems: "center", justifyContent: "center", borderRadius: 5, paddingHorizontal:32, paddingVertical: 2, marginLeft: 0, marginTop: 0 }}>
                    <Text style={{ color: "#fff", backgroundColor: primaryColor, padding: 10 }}> Set Notification</Text>
                </TouchableOpacity>
                {modalVisible &&
                    <TouchableOpacity onPress={() => {
                        setModalVisible(false);
                    }} style={{ backgroundColor: "#fff", borderRadius: 10, position: "absolute", top: 20, width: windowWidth - 50, left: 10, right: 0, padding: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Notification</Text>
                        <Text style={{ color: "#000", fontSize: 15 }}>{noti.title}</Text>
                        {
                            noti.selectedMood && <Text style={{ color: "#888", fontSize: 14 }}>{noti.selectedMood}</Text>
                        }

                        <Text style={{ color: "#888", fontSize: 14 }}>{noti.description}</Text>
                    </TouchableOpacity>}


            </ScrollView>
            <Modal visible={showAdd} fullScreen={true}>
                <View style={{ backgroundColor: "#fff", marginTop: 100, alignItems: "center" }}>
                    <Text style={{ color: "#ff0000", fontSize: 16}}>Please enter the hour and minute for notification</Text>


                    <Text style={{ marginTop: 20 , fontSize: 16,marginBottom:10}}>Wakeup time</Text>
                    {/* <View style={{ marginTop: 10 }}>
                        <Button onPress={() => {
                            setShowWakeupTime(true);
                        }} title={wakeupTime ? moment(wakeupTime).format("HH:mm") : 'Select'}></Button>
                    </View> */}
                    {showWakeupTime ? <DateTimePicker value={wakeupTime} mode="time" onChange={(v) => {
                        setWakeupTime(new Date(v.nativeEvent.timestamp));
                       // setShowWakeupTime(false);
                    }} /> : <></>}

                    <Text style={{ marginTop: 50 ,fontSize: 16,marginBottom:10}}>Sleep time</Text>
                    {/* <View style={{ marginTop: 10 }}>
                        <Button onPress={() => {
                            setShowSleepTime(true);
                        }} title={sleepTime ? moment(sleepTime).format("HH:mm") : 'Select'}></Button>
                    </View> */}
                    {showSleepTime ? <DateTimePicker value={sleepTime} mode="time" onChange={(v) => {
                        setSleepTime(new Date(v.nativeEvent.timestamp));
                       // setShowSleepTime(false);
                    }} /> : <></>}
                    <TouchableOpacity onPress={() => {
                        add();
                    }} style={{ backgroundColor:primaryColor, borderRadius: 10, padding: 10, marginTop: 60,width:80,display:'flex',justifyContent:'center',alignItems:'center' }}>
                        <Text style={{color:"#fff"}}>
                            ADD
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setShowAdd(false);
                    }} style={{ backgroundColor: primaryColor, borderRadius: 10, padding: 10, marginTop: 10 ,width:80,display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:"#fff"}}>
                            CLOSE
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 10,
        backgroundColor: "#fff",
        flex: 1,
    },
    container1: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        paddingBottom: 20,

    },
    list: {
        flex: 8,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
});

export default Entries;