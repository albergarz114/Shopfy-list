import { Text, View, StyleSheet, FlatList, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import ListItem from "@/components/ListItem";
import AddItem from "@/components/AddItem"
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons'; 
import { useSettings } from '../context/SettingsContext';
import * as Haptics from 'expo-haptics';
import GlobalToolbar from "@/components/GlobalToolbar";
const Index = () => {
  
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode, isGerman, isSoundOn } = useSettings();

  // Networking: Fetch Recipes from Spoonacular
  const fetchRecipes = async () => {
    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=chicken&number=10&intolerances=egg,dairy`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const formattedData = data.results.map(recipe => ({
        id: recipe.id.toString(),
        text: recipe.title
      }));
      setItems(formattedData);
    } catch (error) {
      Alert.alert("Error", "Could not fetch recipes. Check your internet or API key.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const deleteItem = (id) => {
    if (isSoundOn) {
    // This creates a heavier system "thud" sound/vibration
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }
    setItems(prevItems => prevItems.filter(item => item.id != id));
  };

  const addItem = (text) => {
    
    if (!text) {
      if (isSoundOn) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Error', 'Please enter an item');
    } else {
      if (isSoundOn) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
      setItems(prevItems => [{ id: Date.now().toString(), text }, ...prevItems]);
    }
  };

  const updateItem = (id, newItem) => {
    setBeers(prevItems => prevItems.map(beer => beer.id === id ? {...beer, text: newText} : beer));
  };

  

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f8f9fa' }]}>
      
      <GlobalToolbar title={isGerman ? 'Einkaufliste': 'Shopping List'}/>
      <AddItem addItem={addItem} />

      {loading ? (
        <ActivityIndicator size="large" color="purple" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <ListItem item={item} deleteItem={deleteItem} updateItem={updateItem} />
          )}
          style={styles.list}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      
      {/* NAVIGATION BUTTONS */}
      <View style={[styles.buttonContainer, { backgroundColor: isDarkMode ? '#121212': '#f8f9fa'}]}>
        <TouchableOpacity style={styles.notesButton} onPress={() => router.push('/notes')}>
          <Text style={styles.notesButtonText}>{ isGerman ? 'Unsere Notizen' : 'Our Notes Page'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.productButton} onPress={() => router.push('/products')}>
          <Text style={styles.productButtonText}>{ isGerman ? 'Produkten' : 'Products'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shopButton} onPress={() => router.push('/shops')}>
          <Text style={styles.shopButtonText}>{ isGerman ? 'Unseren Shop' : 'Our Shop'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.beerButton} onPress={() => router.push('/beers')}>
          <Text style={styles.beerButtonText}>{isGerman ? 'Unseren Bierzen' : 'Our Beer Page'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: 50,
    backgroundColor: '#fff',
    height: 110,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  hamburger: {
    position: 'absolute',
    left: 20,
    top: 60,
    zIndex: 10,
  },
  headerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    padding: 20,
    alignItems: 'center',
  },
  notesButton: {
    width: '90%',
    borderRadius: 30,
    backgroundColor: 'purple',
    marginBottom: 10,
    elevation: 5,
  },
  notesButtonText: {
    padding: 15,
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  productButton: {
    width: '90%',
    borderRadius: 12,
    backgroundColor: '#FFD700',
    borderBottomWidth: 4,
    borderBottomColor: '#B8860B',
    marginBottom: 10,
  },
  productButtonText: {
    padding: 15,
    color: 'black',
    textAlign: 'center',
    fontWeight: '900',
  },
  shopButton: {
    width: '90%',
    backgroundColor: 'black',
    borderRadius: 5,
    borderLeftWidth: 8,
    borderLeftColor: 'darkslateblue',
    marginBottom: 10,
  },
  shopButtonText: {
    padding: 15,
    color: 'white',
    textAlign: 'center',
    letterSpacing: 2,
  },
  beerButton: {
    width: '90%',
    borderRadius: 12,
    backgroundColor: '#FFD700',
    borderBottomWidth: 4,
    borderBottomColor: '#B8860B',
    marginBottom: 10,
  },
  beerButtonText: {
    padding: 15,
    color: 'black',
    textAlign: 'center',
    fontWeight: '900',
  },
});

export default Index;