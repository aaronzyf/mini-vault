/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import LaunchScreen from '@mini-vault-components/launch-screen';


// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync()
  .then(result => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
  .catch(console.warn); // it's good to explicitly catch and inspect any error


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const [isReady,setIsReady] = useState(false);

  useEffect(()=>{
    (async () => {
      await SplashScreen.preventAutoHideAsync();
      setTimeout(async () => {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }, 2000);
    })();
  },[])

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {
        isReady ?  <AppContent /> : null
      }
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <View style={styles.container}>
      <LaunchScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
});

export default App;
