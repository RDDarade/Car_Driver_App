import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

// Secret key for HMAC SHA-256 (use a strong, unique key in production)
const SECRET_KEY = "4eNym04PkzSRci/K3tvTVuwy36evvEyInVhI2TFW9iE=";

// Function to generate and store JWT token
export const generateAndSetToken = async (mobile, user_id) => {
  try {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      mobile,
      user_id, // Include user_id in the payload
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 15, // 15 days expiration
    }));
    // Generate HMAC SHA-256 signature
    const signature = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      `${header}.${payload}.${SECRET_KEY}`,
      { encoding: Crypto.CryptoEncoding.BASE64 }
    );

    // Construct the JWT token
    const token = `${header}.${payload}.${signature}`;
    await AsyncStorage.setItem('token', token);
    return true;
  } catch (error) {
    console.log("Error generating token:", error);
    return false;
  }
};

// Function to verify JWT token
export const verifyToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) return false;

    const [header, payload, signature] = token.split('.');
    const expectedSignature = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      `${header}.${payload}.${SECRET_KEY}`,
      { encoding: Crypto.CryptoEncoding.BASE64 }
    );

    // Check if the signature matches
    if (signature !== expectedSignature) {
      console.log("Invalid token signature");
      return false;
    }

    // Decode payload and check expiration
    const decodedPayload = JSON.parse(atob(payload));
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime > decodedPayload.exp) {
      await AsyncStorage.removeItem('token');
      return false;
    }
    return decodedPayload.user_id || null;
  } catch (error) {
    console.log("Error verifying token:", error);
    return false;
  }
};

// Function to remove the token (logout)
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
    return true;
  } catch (error) {
    console.log("Error removing token:", error);
    return false;
  }
};
