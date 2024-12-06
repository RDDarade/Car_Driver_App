import { useEffect } from "react";
import { useRouter,Stack } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {
  const { isLogged } = useGlobalContext();
  const router = useRouter();

  // Redirect before rendering the screen content
  useEffect(() => {
    if (isLogged) {
      router.replace("/screens/HomeScreen");  // Navigate to HomeScreen if logged in
    }
  }, [isLogged, router]);

  // If isLogged is false, allow rendering the authentication screens
  if (isLogged) {
    return null;  // Prevent rendering the AuthLayout if already logged in
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" />
        <Stack.Screen name="SignUPScreen" />
        <Stack.Screen name="OtpScreen" />
      </Stack>
    </>
  );
};

export default AuthLayout;
