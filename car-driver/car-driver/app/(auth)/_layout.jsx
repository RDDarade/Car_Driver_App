import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// import { Loader } from "../../components";
// import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {
    // const { loading, isLogged } = useGlobalContext();

    // if (!loading && isLogged) return <Redirect href="/HomeScreen" />;

    return (
        <>
            <Stack screenOptions={{ headerShown: false, }}>
                <Stack.Screen name="LoginScreen" />
                <Stack.Screen name="SignUPScreen" />
                <Stack.Screen name="OtpScreen" />
            </Stack>
            {/* 
      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="light" /> */}
        </>
    );
};

export default AuthLayout;