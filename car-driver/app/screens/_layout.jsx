import React, { useEffect } from 'react';
import { useRouter, Stack } from 'expo-router';
import { useGlobalContext } from "../../context/GlobalProvider";

const TabsLayout = () => {
  const { isLogged } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    // Redirect to SignUPScreen if not logged in
    if (!isLogged) {
      router.replace('/auth/SignUPScreen');
    }
  }, [isLogged, router]); // Only run effect when isLogged or router changes

  // If not logged in, the component will return null while redirecting
  if (!isLogged) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Define the screens for the tab navigation */}
      <Stack.Screen name="HomeScreen" />
      <Stack.Screen name="ProfileScreen" />
      <Stack.Screen name="WalletScreen" />
      <Stack.Screen name="AddCarScreen" />
      <Stack.Screen name="LegalHelpScreen" />

      <Stack.Screen name="ActiveBookingScreen" />
      <Stack.Screen name="BookingHistoryScreen" />
      {/* <Stack.Screen name="MyBookingDetails" /> */}

      <Stack.Screen name="CreditsScreen" />
      <Stack.Screen name="B2BAgentsScreen" />
      <Stack.Screen name="PenaltyScreen" />
      <Stack.Screen name="SLAAgreementScreen" />
      <Stack.Screen name="LogOutScreen" />
    </Stack>
  );
};

export default TabsLayout;
