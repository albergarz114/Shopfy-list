import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from "react-native-vector-icons/FontAwesome";
import { useSettings } from '../context/SettingsContext';

const AddProductItem = ({addProduct}) => {

    const [text, setText] = useState('');
    const onChange = (textValue) => setText(textValue);

    const { isDarkMode, isGerman } = useSettings();
    const textColor = isDarkMode ? 'white':'dark';
    const placeholderColor = isDarkMode ? '#888':'#666';

  return (
    <View>
      <TextInput
      placeholder={isGerman ? "Artikel hinzufügen.." : "Add Product.."}
      placeholderTextColor={placeholderColor}
      style={[styles.input, {color: textColor}]}
      onChangeText={onChange}
      value={text}
      />
      <TouchableOpacity
      testID="add-product-button"
      style={styles.button}
      onPress={() => addProduct(text)}
      >
        <Text style={styles.buttonText}>
            <Icon
            name='plus'
            size={20}
            />
            {''}{isGerman ? 'Hinzufügen' : 'Add Product'}
        </Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({

    input: {
        height: 60,
        padding: 9,
        fontSize: 30,
    },

    button: {
        width: '80%',
        borderRadius: 12,
        backgroundColor: '#FFD700',
        borderBottomWidth: 5,
        borderBottomColor: '#B8860B',
        marginBottom: 15,
        paddingHorizontal: 30,

    },

    buttonText: {
        color: 'black',
        fontWeight: '900',
        textAlign: 'center',
        padding: 15,
        
    },


});

export default AddProductItem;