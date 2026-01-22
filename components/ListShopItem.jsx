import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, {useState} from 'react';
import Icon from "react-native-vector-icons/FontAwesome";
import { useSettings } from '../context/SettingsContext';


const ListShopItem = ({shop, deleteShop, updateShop}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(shop.text);
  const { isDarkMode } = useSettings();


  const handleUpdate = () => {
    updateShop(shop.id, editText);
    setIsEditing(false);
  }

  const textColor = isDarkMode ? 'white' : '#333';
  const rowBg = isDarkMode ? '#1e1e1e' : '#fff';
  const borderCol = isDarkMode ? '#333' : '#eee'; 
    
  return (
    <TouchableOpacity style={[styles.shopItem, {backgroundColor: rowBg, borderColor: borderCol}]}>
    <View style={styles.shopItemView}> 
      {isEditing ? (
        <TextInput
        style={[styles.editInput, {color: textColor}]}
        value={editText}
        onChangeText={setEditText}
        autoFocus
        />
      ) : (
        <Text style={[styles.shopItemText, {color: textColor}]}>{shop.text}</Text>
      )}
      <View style={styles.icons}>
        {isEditing ? (
          <Icon
          name='check'
          size={20}
          color="yellow"
          onPress={handleUpdate}
          testID={`save-btn-${shop.id}`}
          />
        ) : (
          <Icon
          name='pencil'
          size={20}
          color="orange"
          onPress={() => setIsEditing(true)}
          testID={`edit-btn-${shop.id}`}
          />
        )}
      <Icon
      name="trash"
      size={20}
      color="firebrick"
      onPress={() => deleteShop(shop.id)}
      testID={`delete-btn-${shop.id}`}
      />
    </View>
    </View>
    </TouchableOpacity>
  )
};


const styles = StyleSheet.create({
  shopItem: {
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

  shopItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  shopItemText: {
    fontSize: 17,
    fontWeight: '500',
    flex: 1,
  },

  editInput: {
      fontSize: 18,
      borderBottomWidth: 1,
      borderBottomColor: 'blue',
      flex: 1
  },

  icons: {
    flexDirection: 'row',
    gap: 12,
  }

});

export default ListShopItem;