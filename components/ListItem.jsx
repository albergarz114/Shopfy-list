import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSettings } from "@/context/SettingsContext";

const ListItem = ({item, deleteItem, updateItem}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(item.text);
  const { isDarkMode } = useSettings();

  const handleUpdate = () => {
    updateItem(item.id, editItem);
    setIsEditing(false);
  };

  const textColor = isDarkMode ? 'white' : '#333';
  const rowBg = isDarkMode ? '#1e1e1e' : '#fff';
  const borderCol = isDarkMode ? '#333' : '#eee';

  return (
    <View style={[styles.listItem, { backgroundColor: rowBg, borderColor: borderCol }]}>
      <View style={styles.listItemView}>
        
        {/* TEXT AREA: Wrapping this in a View with flex: 1 keeps it orderly */}
        <View style={styles.textContainer}>
          {isEditing ? (
            <TextInput
              style={[styles.editInput, {color: textColor}]}
              value={editItem}
              onChangeText={setEditItem}
              autoFocus
            />
          ) : (
            <Text style={[styles.listItemText, {color: textColor}]} numberOfLines={2}>
              {item.text}
            </Text>
          )}
        </View>

        {/* ICON AREA: This stays fixed to the right */}
        <View style={styles.iconContainer}>
          {isEditing ? (
            <Icon name="check" size={20} color="green" onPress={handleUpdate} style={styles.icon} />
          ) : (
            <Icon name="pencil" size={20} color="blue" onPress={() => setIsEditing(true)} style={styles.icon} />
          )}
          <Icon name="trash" size={20} color="firebrick" onPress={() => deleteItem(item.id)} style={styles.icon} />
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
  },
  listItemView: {
    flexDirection: 'row',
    alignItems: 'center', // Keeps icons and text vertically centered
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1, // This is the secret! It takes up all space except what the icons need
    marginRight: 10, // Adds a "safety gap" so text never touches icons
  },
  listItemText: {
    fontSize: 18,
    color: '#333',
  },
  editInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
    paddingVertical: 0,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 70, // Gives icons a set "parking space"
  },
  icon: {
    marginLeft: 15, // Uniform spacing between buttons
  },
});

export default ListItem;