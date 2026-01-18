import { View, Text, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import AddBeerItem from '../../components/AddBeerItem';
import ListBeerItem from '../../components/ListBeerItem';
import GlobalToolbar from "@/components/GlobalToolbar";
import { useSettings } from '@/context/SettingsContext';

const BeerScreen = () => {

    const router = useRouter();
    const { isDarkMode, isGerman } = useSettings();
    const [beers, setBeers] = useState([
        {id: 1, text: "Northern Style Pilsner"},
        {id: 2, text: "Kellerbier"},
        {id: 3, text: "Kellerpils"},
        {id: 4, text: "Dark Lager"},
        {id: 5, text: "Kölsch"},
        {id: 6, text: "Hefeweißbier"},
        {id: 7, text: "Dunkle HefeWeißbier"},
    ]); 


    const addBeer = (text) => {
        if(!text) {
            Alert.alert(isGerman ? 'Fehler' : 'Error', isGerman ? 'Bitte schreiben Bier Produkten':'Please enter a beer item', {text: 'Ok'});
        } else {
            setBeers(prevItems => {
                return [{id: Date.now(), text}, ...prevItems];
            });
        }
    };


    const deleteBeer = (id) => {
        setBeers(prevItems => {
            return prevItems.filter(beer => beer.id != id);
        });
    };


    const updateBeer = (id, newText) => {
        setBeers(prevItems => prevItems.map(beer => beer.id === id ? {...beer, text: newText} : beer));
    };


  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212':'#f8f9fa'}]}>
      <GlobalToolbar title={isGerman ? 'Bier Menu': 'Beer Menu'}/>
      <AddBeerItem addBeer={addBeer}/>
      <FlatList
      data={beers}
      renderItem={({item}) =>
      <ListBeerItem beer={item} deleteBeer={deleteBeer} updateBeer={updateBeer} style={styles.list}/>
    }
      />
    </View>
  )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
    },

    list: {
        width: '100%',
    }

});

export default BeerScreen;
