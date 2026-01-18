import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Settings = () => {

  const { isDarkMode, isGerman, isSoundOn, toggleTheme, toggleLanguage, toggleSound } = useSettings();
  const textColor = isDarkMode ? 'white': 'dark';

  return (
    // Dynamic background color based on the toggle
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f8f9fa' }]}>

      <View style={styles.settingRow}>
        <Text style={[styles.label, {color: textColor}]}>
        {isGerman ? 'Dunkelmodus': 'Dark Mode'}
        </Text>
      <Switch onValueChange={toggleTheme} value={isDarkMode}/>
      </View>

      <View style={styles.settingRow}>
        <Text style={[styles.label, {color: textColor}]}>
        {isGerman ? 'Sprachen Deustch':'Language English'}
        </Text>
      <Switch onValueChange={toggleLanguage} value={isGerman}/>
      </View>

      <View style={styles.settingRow}>
        <Text style={[styles.label, {color: textColor}]}>
        {isGerman ? 'Ton an' : 'Sound On'}
        </Text>
        <Switch onValueChange={toggleSound} value={isSoundOn}/>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: 18,
  },
});

export default Settings;