// (tabs)/_layout.jsx
import React from 'react';
import { Stack } from 'expo-router';

const TabsLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            {/* Define the screens for the tab navigation */}
            <Stack.Screen name="HomeScreen" />
            <Stack.Screen name="ProfileScreen" />
            <Stack.Screen name="WalletScreen" />
            <Stack.Screen name="AddCarScreen" />
            <Stack.Screen name="LegalHelpScreen" />
            <Stack.Screen name="CreditsScreen" />
            <Stack.Screen name="B2BAgentsScreen" />
            <Stack.Screen name="PenaltyScreen" />
            <Stack.Screen name="SLAAgreementScreen" />
            <Stack.Screen name="LogOutScreen" />
        </Stack>
    );
};

export default TabsLayout;
