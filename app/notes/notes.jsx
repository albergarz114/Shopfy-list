import { Stack } from 'expo-router';
import { Text, View, StyleSheet, FlatList, Alert, TouchableOpacity} from "react-native";
import React, {useState} from 'react';
import HeaderNote from '../../components/HeaderNote';
import ListNoteItem from '../../components/ListNoteItem';
import AddNoteItem from '../../components/AddNoteItem';
import { useRouter } from 'expo-router';
import { useSettings } from '@/context/SettingsContext';
import GlobalToolbar from "@/components/GlobalToolbar";


const NotesScreen = () => {

    const router = useRouter();
    const { isDarkMode, isGerman } = useSettings(); 
    const [notes, setNoteItems] = useState([
        {id: 1, text: 'Wash the car'},
        {id: 2, text: 'Wash the dishes'},
        {id: 3, text: 'Take out trash'},
        {id: 4, text: 'Bath the dog'},
    ]);

    const addNote = (text) => {
        if(!text) {
            Alert.alert(isGerman ? 'Fehler' : 'Error', isGerman ? 'Bitte Schreiben Sie die Noten' : 'Please enter a note item', {text: 'OK'});
        } else {
            setNoteItems(prevNotes => {
            return [{id: Date.now(), text}, ...prevNotes];
            });
        }
    }

    const deleteNote = (id) => {
        setNoteItems(prevNotes => {
            return prevNotes.filter(note => note.id != id);
        });
    }

    const updateNote = (id, newText) => {
        setNoteItems(prevNotes =>
            prevNotes.map(note =>
                note.id === id ? {...note, text: newText} : note
            )
        );
    };

    return (
        <View style={[styles.container, {backgroundColor: isDarkMode ? '#121212' : '#f8f9fa'}]}>
        <GlobalToolbar title={isGerman ? 'Noten' : 'Notes Menu'}/>
        <AddNoteItem addNote={addNote}/>
        <FlatList
        data={notes}
        renderItem={({item}) =>
        <ListNoteItem note={item} deleteNote={deleteNote} updateNote={updateNote}/>}
        style={styles.list}
        />
        </View>
    )
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        color: 'purple',
        paddingBottom: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
    },

    list: {
        width: '100%',
    },

});

export default NotesScreen;