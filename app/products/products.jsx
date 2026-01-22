import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import HeaderProduct from '../../components/HeaderProduct';
import AddProductItem from '../../components/AddProductItem';
import ListProductItem from '../../components/ListProductItem';
import { useRouter } from 'expo-router';
import { useSettings } from '@/context/SettingsContext';
import GlobalToolbar from "@/components/GlobalToolbar";
import { addProductLogic, deleteProductLogic, updateProductLogic } from '../../utils/productLogic';
import { savedProducts, loadProducts } from '../../utils/storage';
import { triggerLayoutAnimation } from '../../utils/animations';
import AppBackground from '../../components/AppBackground';

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

    useEffect (() => {
        const fetchProducts = async () => {
            const savedData = await loadProducts();
            if (savedData) {
                setProducts(savedData);
            }
        };
        fetchProducts();
    }, []);


    // Add
    const addProduct = async (text) => {
        const { error, data } = addProductLogic(products, text);
        if(!error) {
            triggerLayoutAnimation();
            setProducts(data);
            await savedProducts(data);
        } else {
            //setProducts(prevProducts => {
            //    return [{id: Date.now(), text}, ...prevProducts];
            //});
            Alert.alert(isGerman ? 'Fehler':'Error', isGerman ? 'Bitte Schreiben Sie Produkten':'Please enter a product item', {text: 'Ok'});
        }
    };


    // Delete
    const deleteProduct = async (id) => {
        const { data } = deleteProductLogic(products, id);
        //setProducts(prevProducts => {
        //    return prevProducts.filter(product => product.id != id);
        //});
        setProducts(data);
        await savedProducts(data);
        triggerLayoutAnimation();
    };


    // Update
    const updateProduct = async (id, newText) => {
        const { error, data } = updateProductLogic(products, id, newText);
        //setProducts(prevProducts => prevProducts.map(product => product.id === id ? {...product, text: newText} : product))
        if(!error){
            setProducts(data);
            await savedProducts(data);
            triggerLayoutAnimation();
        }
    };

  return (
    <AppBackground>
    <View style={styles.container}>
      <GlobalToolbar title={isGerman ? 'Produkten Hinzufügen' : 'Add Product'}/>
      <AddProductItem addProduct={addProduct}/>
      <FlatList
      data={products}
      renderItem={({item}) => 
     <ListProductItem product={item} deleteProduct={deleteProduct} updateProduct={updateProduct}style={styles.list}/>
    }
    />
    </View>
    </AppBackground>
  )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        color: 'yellow',
        paddingBottom: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        width: '100%',
    },

    list: {
        width: '100%',
    },
});



export default ProductScreen;