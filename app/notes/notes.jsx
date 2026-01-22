import { Stack } from 'expo-router';
import { Text, View, StyleSheet, FlatList, Alert, TouchableOpacity} from "react-native";
import React, { useState, useEffect } from 'react';
import HeaderNote from '../../components/HeaderNote';
import ListNoteItem from '../../components/ListNoteItem';
import AddNoteItem from '../../components/AddNoteItem';
import { useRouter } from 'expo-router';
import { useSettings } from '@/context/SettingsContext';
import GlobalToolbar from "@/components/GlobalToolbar";
import { addNoteLogic, deleteNoteLogic, updateNoteLogic } from '../../utils/noteLogic';
import { savedNotes, loadNotes } from '../../utils/storage';
import { triggerLayoutAnimation } from '../../utils/animations';
import AppBackground from '../../components/AppBackground';

const NotesScreen = () => {

    const router = useRouter();
    const { isDarkMode, isGerman } = useSettings(); 
    const [notes, setNoteItems] = useState([
        {id: 1, text: 'Wash the car'},
        {id: 2, text: 'Wash the dishes'},
        {id: 3, text: 'Take out trash'},
        {id: 4, text: 'Bath the dog'},
    ]);

    useEffect(() => {
        const fetchNotes = async () => {
            const savedData = await loadNotes();
            if (savedData) {
                setNoteItems(savedData);
            }
        };
        fetchNotes();
    }, []);

    // Parameters(Unit tests) have to be in order the same as NoteScreen
    const addNote = async (text) => {
        const { error, data } = addNoteLogic(notes, text);
        if(!error) {
            setNoteItems(data);
            await savedNotes(data);
            triggerLayoutAnimation();
        } else {
            //setNoteItems(prevNotes => {
            //return [{id: Date.now(), text}, ...prevNotes];
            //});
            
            Alert.alert(isGerman ? 'Fehler' : 'Error', isGerman ? 'Bitte Schreiben Sie die Noten' : 'Please enter a note item', {text: 'OK'});
            
        }
    }
    // Parameters(Unit tests) have to be in order the same as NoteScreen
    const deleteNote = async (id) => {
        const { data } = deleteNoteLogic(notes, id);
        //setNoteItems(prevNotes => {
        //    return prevNotes.filter(note => note.id != id);
        //});
        setNoteItems(data);
        await savedNotes(data);
        triggerLayoutAnimation();
    }

    // Parameters(Unit tests) have to be in order the same as NoteScreen
    const updateNote = async (id, newText) => {
        const { error, data } = updateNoteLogic(notes, id, newText);
        
        //setNoteItems(prevNotes =>
        //    prevNotes.map(note =>
        //        note.id === id ? {...note, text: newText} : note
        //    )
        //);
        if (!error) {
            setNoteItems(data);
            await savedNotes(data);
            triggerLayoutAnimation();
        }
    };

    return (
        <AppBackground>
        <View style={styles.container}>
        <GlobalToolbar title={isGerman ? 'Noten' : 'Notes Menu'}/>
        <AddNoteItem addNote={addNote}/>
        <FlatList
        data={notes}
        renderItem={({item}) =>
        <ListNoteItem note={item} deleteNote={deleteNote} updateNote={updateNote}/>}
        style={styles.list}
        />
        </View>
        </AppBackground>
    )
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        color: 'purple',
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

export default NotesScreen;