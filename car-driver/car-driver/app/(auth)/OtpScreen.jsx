import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const OtpScreen = ({ route }) => {
  // const { mobile } = route.params;
  const [otp, setOtp] = useState('');

  const router = useRouter();

  const handleVerifyOtp = () => {
    if (otp === '1234') { // Placeholder OTP for testing
      Alert.alert('Success', 'OTP verified successfully!');
      router.navigate('HomeScreen'); // Navigate to the Home screen
    } else {
      Alert.alert('Error', 'Invalid OTP, please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      {/* <Text style={styles.subtitle}>We have sent an OTP to {mobile}</Text> */}
      <Text style={styles.subtitle}>We have sent an OTP to </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={4}
        placeholderTextColor="#000"
      />
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
        <Text style={styles.verifyText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '',
  },
  title: {
    fontSize: 28,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#888',
    padding: 10,
    borderRadius: 8,
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  verifyButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  verifyText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default OtpScreen;
