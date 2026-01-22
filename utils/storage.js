import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_KEY = '@notes_data';
const BEERS_KEY = '@beers_data';
const SHOPS_KEY = '@shops_data';
const PRODUCTS_KEY = '@products_data';

export const savedNotes = async (notes) => {

    try {
        const jsonValue = JSON.stringify(notes);
        await AsyncStorage.setItem(NOTES_KEY, jsonValue);
    } catch(e) {
        console.error("Error saving notes", e);
    }
};

export const loadNotes = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(NOTES_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error("Error loading notes", e);
        return null;
    }
};

export const savedBeers = async (beers) => {

    try {
        const jsonValue = JSON.stringify(beers);
        await AsyncStorage.setItem(BEERS_KEY, jsonValue);
    } catch (e) {
        console.error("Error saving beers", e);
    }
};


export const loadBeers = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(BEERS_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error("Error loading beer", e);
        return null;
    }
};


export const savedShops = async (shops) => {

    try {
        const jsonValue = JSON.stringify(shops);
        await AsyncStorage.setItem(SHOPS_KEY,jsonValue);
    } catch (e) {
        console.error("Error saving shops", e);
    }
};


export const loadShops = async () => {

    try {
        const jsonValue = await AsyncStorage.getItem(SHOPS_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error("Error loading shops", e);
        return null;
    }
};

export const savedProducts = async (products) => {

    try {
        const jsonValue = JSON.stringify(products);
        await AsyncStorage.setItem(PRODUCTS_KEY, jsonValue);
    } catch (e) {
        console.error('Error saving products', e);
    }
};


export const loadProducts = async () => {

    try {
        const jsonValue = await AsyncStorage.getItem(PRODUCTS_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error('Error loading products', e);
        return null;
    }
};