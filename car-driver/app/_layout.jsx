import { Stack } from "expo-router";
import { GlobalProvider } from "../context/GlobalProvider";


const RootLayout = () => {
 
  return (
    <GlobalProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="screens" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="index" />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;