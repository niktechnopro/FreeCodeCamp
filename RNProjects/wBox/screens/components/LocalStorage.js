import AsyncStorage from '@react-native-community/async-storage';


export default class LocalStorage {

    static getAllKeys = async () => {
        try {
            return await AsyncStorage.getAllKeys();
        } catch (error) {
            console.log(error);
        }
    }

    static setItem = async (key, value) => {
        try {
            return await AsyncStorage.setItem(key, value);
        } catch (error)  {
            console.log(error);
        }
    }

    static getItem = async (key, value) => {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error)  {
            console.log(error);
        }
    }

    static removeItem = async (key) => {
        try {
            return await AsyncStorage.removeItem(key);
        } catch (error)  {
            console.log(error);
        }
    }

    static clearAll = async () => {
        try{
            return await AsyncStorage.clear();
        }catch(error){
            console.log(error);
        }
    }
}