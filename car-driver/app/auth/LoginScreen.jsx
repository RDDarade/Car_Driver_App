import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native';
import { useGlobalContext } from "../../context/GlobalProvider";

import logo1 from '../../assets/logo1.jpg'
import logo2 from '../../assets/logo2.jpg'
import logo3 from '../../assets/logo3.jpg'

const LoginScreen = () => {

  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useGlobalContext();

  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (!mobile || mobile.length !== 10) {
        Alert.alert('You must enter a valid mobile number to continue.');
        return;
      }

      const success = await loginUser(mobile);
      if (success) {
        Alert.alert('OTP sent successfully!');
        router.navigate({ pathname: '/auth/OtpScreen', params: { mobile, success } });
      }
    } catch (error) { }
    finally {
      setLoading(false);
    }
  };



  return (
    <View style={styles.container}>
      {/* Logo at the top */}
      <Image
        source={logo1} // Adjust path based on your file structure
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Let's get started</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mobile No<Text style={{ color: 'red' }}>*</Text></Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter your 10 digit mobile number"
            placeholderTextColor="#666"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="numeric"
            maxLength={10}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        {!loading ? <Text style={styles.loginText}>Log In</Text> :
          <ActivityIndicator color="#ffffff" />}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => router.navigate('/auth/SignUPScreen')}
      >
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Partner with us section */}
      <View style={styles.partnerContainer}>
        <Text style={styles.partnerText}>Partner with us</Text>
        <View style={styles.line} />
      </View>

      {/* Logo with white background */}
      <View style={styles.logoContainer}>
        <Image
          source={logo3} // Adjust path based on your file structure
          style={styles.bottomLogo}
        />
      </View>

      <Image
        source={logo2} // Adjust path based on your file structure
        style={styles.bottomLogo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center', // Center items horizontally
  },
  logo: {
    width: 150, // Set the desired width for the top logo
    height: 100, // Set the desired height for the top logo
    marginBottom: 5, // Space between logo and welcome text
  },
  welcomeText: {
    fontSize: 28,
    color: '#115882',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    color: '#000000',
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%', // Ensures inputs take full width
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    color: '#000000',
  },

  icon: {
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: '#115882',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%', // Ensure button takes full width
  },
  loginText: {
    color: '#ffffff',
    fontSize: 16,
  },
  signUpButton: {
    borderColor: '#115882',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%', // Ensure button takes full width
  },
  signUpText: {
    color: '#115882',
    fontSize: 16,
  },
  partnerContainer: {
    marginTop: 10, // Reduced space above the partner section
    alignItems: 'center', // Center the text and line
  },
  partnerText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 5,
  },
  line: {
    width: '80%', // Width of the line
    height: 1,
    backgroundColor: '#cccccc', // Color of the line
    marginVertical: 5,
  },
  logoContainer: {
    backgroundColor: '#ffffff', // Set the desired background color

    borderRadius: 8, // Optional border radius for rounded corners
    alignItems: 'center', // Center the logo horizontally

  },
  bottomLogo: {
    width: 150, // Set the desired width for the bottom logo
    height: 47, // Set the desired height for the bottom logo
    marginTop: 10, // Space between logos
  },
});

export default LoginScreen;
