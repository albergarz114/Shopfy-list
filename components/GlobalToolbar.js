import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Modal, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSettings } from '../context/SettingsContext';

const { width } = Dimensions.get('window');

const GlobalToolbar = ({ title }) => {
  const router = useRouter();
  const { isDarkMode, isGerman, isSoundOn } = useSettings();
  const [menuVisible, setMenuVisible] = useState(false);

  // Animation value
  const slideAnim = React.useRef(new Animated.Value(-width)).current;

  const toggleMenu = (open) => {
    if (open) {
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    }
  };

  const navigateTo = (path) => {
    toggleMenu(false);
    router.push(path);
  };

  return (
    <>
      <View style={[styles.toolbar, { backgroundColor: isDarkMode ? '#121212' : '#fff', borderBottomColor: isDarkMode ? '#333' : '#eee' }]}>
        <TouchableOpacity style={styles.hamburger} onPress={() => toggleMenu(true)}>
          <Ionicons name="menu" size={32} color={isDarkMode ? 'white' : 'black'} />
        </TouchableOpacity>
        <View style={styles.headerWrapper}>
          <Text style={[styles.titleText, { color: isDarkMode ? 'white' : 'black' }]}>
            {title}
          </Text>
        </View>
      </View>

      {/* THE SLIDING DRAWER */}
      <Modal transparent visible={menuVisible} animationType="none">
        <View style={styles.overlay}>
          {/* Transparent area to close menu by tapping outside */}
          <TouchableOpacity style={styles.closeArea} onPress={() => toggleMenu(false)} />
          
          <Animated.View style={[
            styles.drawer, 
            { transform: [{ translateX: slideAnim }], backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }
          ]}>
            <Text style={[styles.drawerTitle, { color: isDarkMode ? 'white' : 'black' }]}>
              {isGerman ? 'Menü' : 'Menu'}
            </Text>


          <View style={styles.menuItem}>
              <Ionicons 
                name={isSoundOn ? "volume-high" : "volume-mute"} 
                size={24} 
                color={isSoundOn ? "green" : "red"} 
              />
              <Text style={[styles.menuText, { color: isDarkMode ? 'white' : 'black' }]}>
                {isSoundOn ? (isGerman ? 'Ton An' : 'Sound On') : (isGerman ? 'Stumm' : 'Muted')}
              </Text>
            </View>
            

            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/settings')}>
              <Ionicons name="settings" size={24} color="gray" />
              <Text style={[styles.menuText, { color: isDarkMode ? 'white' : 'black' }]}>
                {isGerman ? 'Einstellungen' : 'Settings'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: 50,
    height: 110,
    borderBottomWidth: 1,
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
  titleText: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  // DRAWER STYLES
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Dims the background
    flexDirection: 'row',
  },
  closeArea: {
    flex: 1,
  },
  drawer: {
    width: width * 0.7, // Takes up 70% of screen width
    height: '100%',
    padding: 30,
    paddingTop: 60,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  drawerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: 18,
    marginLeft: 15,
  },
});

export default GlobalToolbar;