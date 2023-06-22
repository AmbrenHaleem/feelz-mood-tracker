import { View, StyleSheet, TouchableOpacity, Text, Alert, Button, ScrollView, RefreshControl, Image, StatusBar, TextInput, Dimensions, Modal } from 'react-native';
import { useState, useEffect } from "react";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import React from 'react';
import moment from "moment";
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { addNoti, addTime, getNotis, getUser, getTime } from '../../../utils/storage';
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

    const [wakeupTime, setWakeupTime] = useState(new Date());



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


    useEffect(() => {
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

            if (every30Seconds && time) {
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
            console.log("notices", notices);

            notices.forEach((item) => {
                let dis = Math.floor((moment().valueOf() - item.time) / 1000);
                let leave = dis % item.value;
                if ((leave <= 60 && dis / item.value >= 1) || every30Seconds) {
                    setNoti(item);
                    setModalVisible(true)
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
        await addNoti({
            title: title,
            description,
            value: selectCate.value,
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
            <ScrollView>
                <View style={{ paddingTop: 30, marginBottom: 10 }}>
                    <Text style={{ color: "#fff", marginBottom: 10 }}>Title</Text>
                    <TextInput style={{ backgroundColor: "#ddd", height: 40, borderRadius: 5, flex: 1, paddingLeft: 10 }} value={title} onChangeText={(t) => {
                        setTitle(t);
                    }} placeholder=''></TextInput>

                </View>

                <View style={{ paddingTop: 30, marginBottom: 10 }}>
                    <Text style={{ color: "#fff", marginBottom: 10 }}>Description</Text>
                    <TextInput style={{ backgroundColor: "#ddd", borderRadius: 5, flex: 1, textAlignVertical: "top", padding: 10 }} numberOfLines={10} value={description} onChangeText={(t) => {
                        setDescription(t);
                    }} placeholder=''></TextInput>

                </View>
                <Text style={{ color: "#fff", marginBottom: 10 }}>Time</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {cates.map((item, i) => <TouchableOpacity key={item.name} onPress={() => {
                        setSelectCate(item);
                        setEvery30Seconds(false);
                    }} style={{ backgroundColor: selectCate == item ? "#000" : "#666", marginRight: i % 2 == 0 ? 10 : 0, borderRadius: 5, marginBottom: 10, width: (windowWidth - 40) / 2 }}>
                        <Text style={{ color: "#fff", padding: 10, }}>{item.name}</Text>
                    </TouchableOpacity>)}
                </View>

                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => {
                        setEvery30Seconds(!every30Seconds);
                        setSelectCate(null);
                    }}>
                        {every30Seconds ? <AntDesign name="checksquareo" size={24} color="#fff" /> : <View style={{ width: 20, height: 20, borderColor: "#fff", borderWidth: 2 }}></View>}
                    </TouchableOpacity>
                    <Text style={{ color: "#fff", marginLeft: 10 }}>Every 30 Seconds (for testing purposes only)</Text>
                </View>

                <Text style={{ color: "#fff", marginBottom: 10, marginTop: 30 }}>Other Settings</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <TouchableOpacity onPress={() => {
                        setShowAdd();
                    }} style={{ backgroundColor: "#000", marginRight: 0, borderRadius: 5, marginBottom: 10, width: (windowWidth - 40) / 2 }}>
                        <Text style={{ color: "#fff", padding: 10, }}>Working Hours</Text>
                    </TouchableOpacity>
                </View>

                {/* <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                    <TouchableOpacity onPress={() => {

                    }}>
                        <Text style={{ color: "#ffffff" }}>Option</Text>
                    </TouchableOpacity>
                </View> */}

                <TouchableOpacity onPress={() => {
                    confirm();
                }} style={{ backgroundColor: "#141588", alignItems: "center", justifyContent: "center", borderRadius: 5, width: 100, marginLeft: 10, marginTop: 20 }}>
                    <Text style={{ color: "#fff", padding: 10 }}>ADD</Text>
                </TouchableOpacity>
                {modalVisible &&
                    <TouchableOpacity onPress={() => {
                        setModalVisible(false);
                    }} style={{ backgroundColor: "#fff", borderRadius: 10, position: "absolute", top: 20, width: windowWidth - 50, left: 10, right: 0, padding: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Notification</Text>
                        <Text style={{ color: "#000", fontSize: 15 }}>{noti.title}</Text>
                        <Text style={{ color: "#888", fontSize: 14 }}>{noti.description}</Text>
                    </TouchableOpacity>}


            </ScrollView >
            <Modal visible={showAdd} fullScreen={true}>
                <View style={{ backgroundColor: "#fff", marginTop: 100, alignItems: "center" }}>
                    <Text style={{ color: "#ff0000" }}>please enter the hour and minute for notification</Text>
                    {/* <View style={{ flexDirection: "row", marginTop: 50 }}>
                        <TextInput value={hour} style={{ borderBottom: "1px solid #000", borderBottomWidth: 1, width: 100 }} onChangeText={(text) => {
                            setHour(text);
                        }}></TextInput>
                        <Text style={{ marginLeft: 10, marginRight: 10 }}>:</Text>
                        <TextInput value={min} style={{ borderBottom: "1px solid #000", borderBottomWidth: 1, width: 100 }} onChangeText={(text) => {
                            setMin(text);
                        }}></TextInput>
                    </View> */}

                    <Text style={{ marginTop: 20 }}>Wakeup time</Text>
                    <View style={{ marginTop: 10 }}>
                        <Button onPress={() => {
                            setShowWakeupTime(true);
                        }} title={wakeupTime ? moment(wakeupTime).format("HH:mm") : 'Select'}></Button>
                    </View>
                    {showWakeupTime ? <DateTimePicker value={wakeupTime} mode="time" onChange={(v) => {
                        setWakeupTime(new Date(v.nativeEvent.timestamp));
                        setShowWakeupTime(false);
                    }} /> : <></>}

                    <Text style={{ marginTop: 50 }}>Sleep time</Text>
                    <View style={{ marginTop: 10 }}>
                        <Button onPress={() => {
                            setShowSleepTime(true);
                        }} title={sleepTime ? moment(sleepTime).format("HH:mm") : 'Select'}></Button>
                    </View>
                    {showSleepTime ? <DateTimePicker value={sleepTime} mode="time" onChange={(v) => {
                        console.log("sleepTime", v);
                        setSleepTime(new Date(v.nativeEvent.timestamp));
                        setShowSleepTime(false);
                    }} /> : <></>}
                    <TouchableOpacity onPress={() => {
                        add();
                    }} style={{ backgroundColor: "#7687ff", borderRadius: 10, padding: 10, marginTop: 60 }}>
                        <Text>
                            ADD
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setShowAdd(false);
                    }} style={{ backgroundColor: "#7687ff", borderRadius: 10, padding: 10, marginTop: 10 }}>
                        <Text>
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
        paddingTop: 24,
        paddingBottom: 10,
        backgroundColor: "#353f48",
        flex: 1,
    },
});

export default Entries;