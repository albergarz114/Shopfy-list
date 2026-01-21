import { View, Text, StyleSheet, FlatList, Alert} from 'react-native'
import React, { useState, useEffect } from 'react';
import HeaderShop from '../../components/HeaderShop';
import AddShopItem from '../../components/AddShopItem';
import ListShopItem from '../../components/ListShopItem';
import GlobalToolbar from "@/components/GlobalToolbar";
import { useSettings } from '@/context/SettingsContext';
import { useRouter } from 'expo-router';
import { addShopLogic, deleteShopLogic, updateShopLogic } from '../../utils/shopLogic';
import { savedShops, loadShops } from '../../utils/storage';


const ShopScreen = () => {

  const router = useRouter();
  const { isDarkMode, isGerman } = useSettings();

  const [shops, setShops] = useState([
        {id: 1, text: "Soap"},
        {id: 2, text: "Sofa"},
        {id: 3, text: "Controller"},
        {id: 4, text: "Restaurants"},
        {id: 5, text: "Pants"},
        {id: 6, text: "Pullover"},
        {id: 7, text: "Accessories"},
  ]);

  useEffect(() => {
    const fetchShops = async () => {
      const savedData = await loadShops();
      if (savedData) {
        setShops(savedData);
      } 
    };
    fetchShops();
  }, []);


  const addShop = async (text) => {
    const { error, data } = addShopLogic(shops, text);
    if(!error) {
      setShops(data);
      await savedShops(data);
    } else {
      //setShops(prevShops => {
      //  return [{id: Date.now(), text}, ...prevShops];
      //});
      Alert.alert('Error', 'Please enter a shop item', {text: 'Ok'});
      
    }
  };

  
  const deleteShop = async (id) => {
    const { data } = deleteShopLogic(shops, id);
    //setShops(prevShops => {
    //  return prevShops.filter(shop => shop.id != id);
    //});
    setShops(data);
    await savedShops(data);
  };


  const updateShop = async (id, newText) => {
    const { error, data } = updateShopLogic(shops, id, newText);
    //setShops(prevShops => prevShops.map(shop => shop.id === id ? {...shop, text: newText} : shop))

    if(!error) {
      setShops(data);
      await savedShops(data);
    }
  };

  
  return (
    <View style={[styles.container, {backgroundColor: isDarkMode ? 'black' : '#f8f9fa'}]}>
      <GlobalToolbar title={isGerman ? 'Herzlich Unsere Shop': 'Welcome to Our Shop'}/>
      <AddShopItem addShop={addShop}/>
      <FlatList
      data={shops}
      renderItem={({item}) =>
        <ListShopItem shop={item} deleteShop={deleteShop} updateShop={updateShop}/> 
      }
      />
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#f8f9fa',
    paddingBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ShopScreen;