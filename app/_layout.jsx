import { Stack } from "expo-router";
import { SettingsProvider } from "../context/SettingsContext";

const RootLayout = () => {
  return (
    <SettingsProvider>
      <Stack>
        {/* The 'index' (Main Screen) header is hidden because you built a custom Toolbar */}
        <Stack.Screen name="index" options={{ headerShown: false }}/>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        
        {/* Other screens with their titles */}
        
        <Stack.Screen name="notes" options={{ headerTitle: false}} />
        <Stack.Screen name="products" options={{ headerTitle: false }} />
        <Stack.Screen name="shops" options={{ headerTitle: false }} />
        <Stack.Screen name="beers" options={{ headerTitle: false }} />
        <Stack.Screen name="settings" options={{ headerShown: true, headerTitle: 'Settings' }} />
      </Stack>
    </SettingsProvider>
  );
};

export default RootLayout;