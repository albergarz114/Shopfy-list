import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useSettings } from '../context/SettingsContext';
import { StyleSheet } from 'react-native';

const AppBackground = ({ children }) => {
  const { theme } = useSettings();

  return (
    <LinearGradient
      colors={theme.vibrantGradient}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 }
});

export default AppBackground;