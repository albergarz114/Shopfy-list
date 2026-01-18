import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import React, { useState } from 'react';
import HeaderProduct from '../../components/HeaderProduct';
import AddProductItem from '../../components/AddProductItem';
import ListProductItem from '../../components/ListProductItem';
import { useRouter } from 'expo-router';
import { useSettings } from '@/context/SettingsContext';
import GlobalToolbar from "@/components/GlobalToolbar";



const ProductScreen = () => {

    const router = useRouter();
    const { isDarkMode, isGerman } = useSettings();
    const [products, setProducts] = useState([
        {id: 1, text: "Car"},
        {id: 2, text: "Sofa"},
        {id: 3, text: "Controller"},
        {id: 4, text: "Pencil"},
        {id: 5, text: "Pants"},
        {id: 6, text: "Pullover"},
        {id: 7, text: "Truck"},
    ]);


    // Add
    const addProduct = (text) => {
        if(!text) {
            Alert.alert(isGerman ? 'Fehler':'Error', isGerman ? 'Bitte Schreiben Sie Produkten':'Please enter a product item', {text: 'Ok'});
        } else {
            setProducts(prevProducts => {
                return [{id: Date.now(), text}, ...prevProducts];
            });
        }
    };


    // Delete
    const deleteProduct = (id) => {
        setProducts(prevProducts => {
            return prevProducts.filter(product => product.id != id);
        });
    };


    // Update
    const updateProduct = (id, newText) => {
        setProducts(prevProducts => prevProducts.map(product => product.id === id ? {...product, text: newText} : product))
    };

  return (
    <View style={[styles.container, {backgroundColor: isDarkMode ? '#121212' : '#f8f9fa'}]}>
      <GlobalToolbar title={isGerman ? 'Produkten Hinzufügen' : 'Add Product'}/>
      <AddProductItem addProduct={addProduct}/>
      <FlatList
      data={products}
      renderItem={({item}) => 
     <ListProductItem product={item} deleteProduct={deleteProduct} updateProduct={updateProduct}style={styles.list}/>
    }
    />
    </View>
    
  )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        color: 'yellow',
        paddingBottom: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
    },

    list: {
        width: '100%',
    },
});



export default ProductScreen;