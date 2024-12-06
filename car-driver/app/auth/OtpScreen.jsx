import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useGlobalContext } from "../../context/GlobalProvider";

const OtpScreen = () => {
  const params = useLocalSearchParams();
  const { mobile, success } = params;
  const [otp, setOtp] = useState(success || '');
  const { verifyOtp } = useGlobalContext();


  const handleVerifyOtp = async () => {
    if (otp.length !== 4) {
      Alert.alert('You must enter a 4-digit OTP.');
      return;
    }
    await verifyOtp(mobile, otp);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>We have sent an OTP to your phone number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={4}
        placeholderTextColor="#777"
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
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    color: '#115882',
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
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
  },
  verifyButton: {
    backgroundColor: '#115882',
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
