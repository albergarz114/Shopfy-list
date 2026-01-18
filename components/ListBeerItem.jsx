import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import Icon from "react-native-vector-icons/FontAwesome";
import { useSettings } from '../context/SettingsContext';


const ListBeerItem = ({beer, deleteBeer, updateBeer}) => {

  const { isDarkMode } = useSettings();
  const textColor = isDarkMode ? 'white' : '#333';
  const rowBg = isDarkMode ? '#1e1e1e' : '#fff';
  const borderCol = isDarkMode ? '#333' : '#eee';

  return (
    <TouchableOpacity style={[styles.beerItem, {backgroundColor: rowBg, borderColor: borderCol}]}>
      <View style={[styles.beerItemView, {color: textColor}]}>
      <Text style={[styles.beerItemText, {color: textColor}]}>{beer.text}</Text>
      <View style={styles.icons}>
      <Icon
        name="trash"
        size={20}
        color="firebrick"
        onPress={() => deleteBeer(beer.id)}
            />
      </View>
      </View>
    </TouchableOpacity>
    
  )
};

const styles = StyleSheet.create({
  beerItem: {
    padding: 15,
    height: 50,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
  },

  beerItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  beerItemText: {
    fontSize: 18,
    flex: 1,
  },

  icons: {
    flexDirection: 'row',
    gap: 15,
  }

});

export default ListBeerItem;