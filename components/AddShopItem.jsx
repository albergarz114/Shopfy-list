import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import { useSettings } from '../context/SettingsContext';


const AddShopItem = ({addShop}) => {

    const [text, setText] = useState('');
    const onChange = (textValue) => setText(textValue);

    const { isDarkMode, isGerman } = useSettings();
    const textColor = isDarkMode ? 'white':'dark';
    const placeholderColor = isDarkMode ? '#888':'#666';

  return (
    <View>
      <TextInput
      placeholder={isGerman ? 'Hinzufügen Shop..' : 'Add Shop Item..'}
      placeholderTextColor={placeholderColor}
      style={[styles.input, {color: textColor}]}
      onChangeText={onChange}
      value={text}
      />
      <TouchableOpacity
      testID="add-shop-button"
      style={styles.button}
      onPress={() => addShop(text)}
      >
      <Text style={styles.buttonText}>
        <Icon
        name='plus'
        size={20}
        />
        {''} {isGerman ? 'Hinzufügen':'Add Shop Item'}
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
        borderRadius: 60,
        backgroundColor: 'purple',
        marginBottom: 15,
        elevation: 10,
        shadowColor: 'purple',
        shadowOffset: {width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        

    },

    buttonText: {
        padding: 15,
        paddingHorizontal: 40,
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '',
    },
});

export default AddShopItem;