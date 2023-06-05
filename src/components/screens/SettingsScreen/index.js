import { View, StyleSheet, TouchableOpacity, Text, Alert, Button, ScrollView, RefreshControl, Image, StatusBar, TextInput, Dimensions, Modal } from 'react-native';
import { useState, useEffect } from "react";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import React from 'react';
import moment from "moment";
import { addNoti, getNotis, getUser } from '../../../utils/storage';

function Entries({ navigation, route }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [cates, setCates] = useState([
        {
            name: "Every 2mins",
            value: 1 * 20
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

    const dealTimes = () => {
        setInterval(async () => {
            let notices = await getNotis();
            console.log("notices", notices);
            notices.forEach((item) => {
                let dis = Math.floor((moment().valueOf() - item.time) / 1000);
                let leave = dis % item.value;
                if (leave <= 60 && dis / item.value >= 1) {
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
                    }} style={{ backgroundColor: selectCate == item ? "#000" : "#666", marginRight: i % 2 == 0 ? 10 : 0, borderRadius: 5, marginBottom: 10, width: (windowWidth - 40) / 2 }}>
                        <Text style={{ color: "#fff", padding: 10, }}>{item.name}</Text>
                    </TouchableOpacity>)}
                </View>

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