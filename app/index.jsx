import { Text, View, StyleSheet, FlatList, Alert } from "react-native";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import AddItem from "@/components/AddItem"
import React, {useState} from "react";


const Index = () => {
  
  const [items, setItems] = useState([
    {id: 1, text: 'Milk'},
    {id: 2, text: 'Meat'},
    {id: 3, text: 'Eggs'},
    {id: 4, text: 'Veggies'},
  ]);


const deleteItem = (id) => {
  setItems(prevItems => {
    return prevItems.filter(item => item.id != id);
  });
}

const addItem = (text) => {
  if(!text) {
    Alert.alert('Error', 'Please enter an item', {text: 'Ok'});
  } else {
    setItems(prevItems => {
    return [{id: Date.now(), text}, ...prevItems];
  });
  }
  
}


  return (
    <View style={styles.container}>
      <Header title='Shopping List'/>
      <AddItem addItem={addItem}/>
      <FlatList
      data={items}
      renderItem={({item}) => 
        <ListItem item={item} deleteItem={deleteItem}/>}
      style={styles.list} 
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#aaa',
    paddingBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  list: {
    width: '100%',
  },


});

export default Index;