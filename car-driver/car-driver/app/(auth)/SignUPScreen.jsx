import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import { Card } from 'react-native-paper';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter()
  const handleSignUp = () => {
    Alert.alert('Success', 'Sign-up successful! You can now log in.');
    router.navigate('/LoginScreen'); // Navigate to Login screen
    // if (!name || !email || !mobile || !password || !confirmPassword) {
    //   Alert.alert('Error', 'Please fill all fields.');
    //   return;
    // }

    // if (password !== confirmPassword) {
    //   Alert.alert('Error', 'Passwords do not match.');
    //   return;
    // }

    // Navigate to Login screen after successful sign-up
    // Alert.alert('Success', 'Sign-up successful! You can now log in.');
    // router.navigate('LoginScreen'); // Navigate to Login screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#888"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mobile No</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your mobile number"
              placeholderTextColor="#666"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
            />
            {email ? <Icon name="check" type="font-awesome" color="green" style={styles.icon} /> : null}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            {email ? <Icon name="check" type="font-awesome" color="green" style={styles.icon} /> : null}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#666"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <Icon
              name={showPassword ? 'eye' : 'eye-slash'}
              type="font-awesome"
              onPress={() => setShowPassword(!showPassword)}
              style={styles.icon}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="#666"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <Icon
              name={showConfirmPassword ? 'eye' : 'eye-slash'}
              type="font-awesome"
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.icon}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.LoginButton}
          onPress={() => router.navigate('/LoginScreen')}
        >
          <Text style={{ color: '#ff6600' }} >Login</Text>
        </TouchableOpacity>


      </Card>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    padding: 24,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%', // Ensures inputs take full width
  },
  label: {
    color: '#000000',
    marginBottom: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    color: '#000000',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  icon: {
    paddingLeft: 10,
  },
  signUpButton: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: '#fff',
    fontSize: 16,
  },
  LoginButton: {
    borderColor: '#ff6600',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  }
});

export default SignUpScreen;
