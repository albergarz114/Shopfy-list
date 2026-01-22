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
        testID={`delete-btn-${beer.id}`}
            />
      </View>
      </View>
    </TouchableOpacity>
    
  )
};

const styles = StyleSheet.create({
  beerItem: {
    padding: 15,
    marginVertical: 6,      // Spacing between cards
    marginHorizontal: 16,   // Spacing from screen edges
    borderRadius: 12,       // Rounded corners
    flexDirection: 'row',
    alignItems: 'center',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android Shadow
    elevation: 3,
  },

  beerItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  beerItemText: {
    fontSize: 18,
    fontWeight: '500',
    flex: 1,
  },

  icons: {
    flexDirection: 'row',
    gap: 12,
  }

});

export default ListBeerItem;