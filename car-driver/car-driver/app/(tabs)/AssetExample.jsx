import { Text, View, StyleSheet, Image } from 'react-native';

export default function AssetExample() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Car Driver App</Text>
      <Text style={styles.paragraph}>
        Your one-stop solution for managing rides and connecting with passengers.
      </Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f8f9fa', // Light background for better contrast
    flex: 1,
  },
  title: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333', // Darker color for visibility
  },
  paragraph: {
    marginBottom: 24,
    fontSize: 16,
    textAlign: 'center',
    color: '#555', // Slightly lighter color for contrast
  },
 
});
