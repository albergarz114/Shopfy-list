import { Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSettings } from "../context/SettingsContext";

const AddNoteItem = ( { addNote }) => {

    const [text, setText] = useState('');

    const onChange = (textValue) => setText(textValue);
    const { isDarkMode, isGerman } = useSettings();
    const textColor = isDarkMode ? 'white':'dark';
    const placeholderColor = isDarkMode ? '#888':'#666';

    return(
        <View>
        <TextInput
        placeholder={isGerman ? "Hinzufügen Noten.." : "Add Note..."}
        placeholderTextColor={placeholderColor}
        style={[styles.input, {color: textColor}]}
        onChangeText={onChange}
        value={text}
        />
        <TouchableOpacity
        style={styles.btn}
        onPress={() => addNote(text)}
        testID="add-note-button"
        >
        <Text
        style={styles.btnText}
        >
        <Icon
        name="plus"
        size={20}
        />
        {''}{isGerman ? 'Hinzufügen' : 'Add Note'}    
        </Text>
        </TouchableOpacity>
        </View>
    );
    
};


const styles = StyleSheet.create({

    input: {
        height: 60,
        padding: 8,
        fontSize: 16,
    },

    btn: {
        backgroundColor: '#c2bad8',
        padding: 9,
        margin: 5,
    },

    btnText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center',
    },

});

export default AddNoteItem;