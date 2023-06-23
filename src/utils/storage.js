import AsyncStorage from '@react-native-async-storage/async-storage';
export const addNoti = async (noti) => {
  try {
    const value = await AsyncStorage.getItem('@notis2') || [];
    value.push(noti);
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@notis2', jsonValue)
  } catch (e) {
    // saving error
  }
}


export const getNotis = async () => {
  try {
    const value = await AsyncStorage.getItem('@notis2')
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return [];
    }
  } catch (e) {
    // error reading value
  }
}

export const addTime = async (noti) => {
  try {
    const jsonValue = JSON.stringify(noti)
    await AsyncStorage.setItem('@time', jsonValue)
  } catch (e) {
    // saving error
  }
}


export const getTime = async () => {
  try {
    const value = await AsyncStorage.getItem('@time')
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return [];
    }
  } catch (e) {
    // error reading value
  }
}