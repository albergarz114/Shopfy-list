import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSettings } from "../context/SettingsContext";

const ListNoteItem = ({note, deleteNote, updateNote}) => {

    const { isDarkMode } = useSettings();
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(note.text);

    const handleUpdate = () => {
        updateNote(note.id, editText);
        setIsEditing(false);
    };
    const textColor = isDarkMode ? 'white':'#333';
    const rowBg = isDarkMode ? '#1e1e1e' : '#fff';
    const borderCol = isDarkMode ? '#333' : '#eee';

    return (
        <TouchableOpacity style={[styles.noteItem, {backgroundColor: rowBg, borderColor: borderCol}]}>
            <View style={styles.noteItemView}>
                {isEditing ? (
                <TextInput
                style={[styles.editInput, {color: textColor}]}
                value={editText}
                onChangeText={setEditText}
                autoFocus
                />
            ) : (
            <Text style={[styles.noteItemText, {color: textColor}]}>{note.text}</Text>
            )}
            <View style={styles.icons}>
            {isEditing ? (
                <Icon
                name="check"
                size={20}
                color="green"
                onPress={handleUpdate}
                testID={`save-btn-${note.id}`}
                />
            ) : (
                <Icon
                name="pencil"
                size={20}
                color="blue"
                onPress={() => setIsEditing(true)}
                testID={`edit-btn-${note.id}`}
                />
            )}
            <Icon 
            name="trash" 
            size={20} 
            color="darkgray"
            onPress={() => deleteNote(note.id)}
            testID={`delete-btn-${note.id}`}
            />
            </View>
            </View>
        </TouchableOpacity>
    );

};


const styles = StyleSheet.create({
    noteItem: {
        padding: 15,
        borderBottomWidth: 1,
    },

    noteItemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    noteItemText: {
        fontSize: 18,
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
    },
});

export default ListNoteItem;