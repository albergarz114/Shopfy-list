import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSettings } from '../context/SettingsContext';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = () => {
  const router = useRouter();
  const { isGerman } = useSettings();

  return (
    <View style={styles.container}>
      {/* 1. ImageBackground covers the whole screen */}
      <ImageBackground 
        source={require('../assets/images/welcome-bg.png')} 
        style={styles.background}
        resizeMode="cover"
      >
        {/* 2. An Overlay to ensure text readability */}
        <View style={styles.overlay}>
          
          <View style={styles.content}>
            {/* Swapped emoji for a cleaner look, or keep it if you like! */}
            <Text style={styles.emoji}>✨</Text>
            
            <Text style={styles.title}>
              {isGerman ? 'Willkommen' : 'Welcome to Shoply'}
            </Text>
            
            <Text style={styles.subtitle}>
              {isGerman 
                ? 'Organisieren Sie Ihren Einkauf einfacher als je zuvor.' 
                : 'Organize your shopping easier than ever before.'}
            </Text>
          </View>

          {/* 3. Golden button to match the image's glow */}
          <TouchableOpacity 
            style={styles.invisibleButton} 
            onPress={() => router.replace('/home')}
          >
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  background: { 
    width: width, 
    height: height 
  },
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark tint so white text pops
    justifyContent: 'space-between', 
    padding: 40 
  },
  content: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  emoji: { 
    fontSize: 80, 
    marginBottom: 20 
  },
  title: { 
    fontSize: 36, 
    fontWeight: '900', 
    textAlign: 'center', 
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10 
  },
  subtitle: { 
    fontSize: 18, 
    textAlign: 'center', 
    marginTop: 15, 
    lineHeight: 26, 
    color: '#eee' 
  },
  
  invisibleButton: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    width: width * 0.8,
    height: 60,
    backgroundColor: 'transparent', // TEMPORARY: Keep this red so you can see it!
    zIndex: 10,
  },
  buttonText: { 
    color: '#000', 
    fontSize: 20, 
    fontWeight: 'bold' 
  }
});

export default WelcomeScreen;