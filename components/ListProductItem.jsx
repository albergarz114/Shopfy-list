import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from 'react';
import { useSettings } from '../context/SettingsContext';

const ListProductItem = ({ product, deleteProduct, updateProduct }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(product.text);
  const { isDarkMode } = useSettings();
  
  const handleUpdate = () => {
    updateProduct(product.id, editText);
    setIsEditing(false);
  };
  const textColor = isDarkMode ? 'white' : '#333';
  const rowBg = isDarkMode ? '#1e1e1e' : '#fff';
  const borderCol = isDarkMode ? '#333' : '#eee';


  return (
    <TouchableOpacity style={[styles.productItem, {backgroundColor: rowBg, borderColor: borderCol}]}>
    <View style={styles.productItemView}>
      {isEditing ? (
        <TextInput
        style={[styles.editInput, {color: textColor}]}
        value={editText}
        onChangeText={setEditText}
        autoFocus
        />
      ) : (
      <Text 
      style={[styles.productItemText, {color: textColor}]}
      >{product.text}
      </Text>
      )}
      <View style={styles.icons}>
        {isEditing ? (
          <Icon
          name="check"
          size={20}
          color="green"
          onPress={handleUpdate}
          testID={`save-btn-${product.id}`}
      />
        ) : (
          <Icon
      name="pencil"
      size={20}
      color="orange"
      onPress={() => setIsEditing(true)}
      testID={`edit-btn-${product.id}`}
      />
        )}
      <Icon
      name="trash"
      size={20}
      color="firebrick"
      onPress={() => deleteProduct(product.id)}
      testID={`delete-btn-${product.id}`}
      />
    </View>
    </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({

  productItem: {
    padding: 15,
    height: 50,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'gray',
    alignSelf: 'stretch',
  },

  productItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  productItemText: {
    fontSize: 18,
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
    gap: 15,
  }

});

export default ListProductItem;