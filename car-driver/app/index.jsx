import React, { useEffect } from 'react';
import { useRouter } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";
import SignUpScreen from './auth/SignUPScreen';
import { ActivityIndicator, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const { isLogged, loading } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isLogged) {
      <StatusBar hidden={true} />
      router.replace('/screens/HomeScreen');
    }
  }, [loading, isLogged]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#115882" />
        <Text>Loading...</Text>
        <StatusBar hidden={true} />
      </View>
    );
  }

  if (!isLogged && !loading) {
    return <>
      <StatusBar hidden={true} />
      <SignUpScreen />
    </>;
  }// If not logged in and loading is done, show the SignUpScreen
}
