import React, { useState } from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { useRouter } from 'expo-router';
import logo1 from '../../assets/logo1.jpg';
import logo2 from '../../assets/logo2.jpg';
import logo3 from '../../assets/logo3.jpg';

const LogOutScreen = () => {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [menuModalVisible, setMenuModalVisible] = useState(false);

  const menuItems = [
    { id: '0', title: 'Home', screen: 'HomeScreen', icon: 'home-outline' },
    { id: '1', title: 'Profile', screen: 'ProfileScreen', icon: 'person-outline' },
    { id: '2', title: 'Wallet', screen: 'WalletScreen', icon: 'wallet-outline' },
    { id: '3', title: 'Add Car', screen: 'AddCarScreen', icon: 'car-outline' },
    { id: '4', title: 'Legal Help', screen: 'LegalHelpScreen', icon: 'help-circle-outline' },
    { id: '5', title: 'Credits', screen: 'CreditsScreen', icon: 'ribbon-outline' },
    { id: '6', title: 'B2B Agents', screen: 'B2BAgentsScreen', icon: 'business-outline' },
    { id: '7', title: 'Penalty', screen: 'PenaltyScreen', icon: 'alert-circle-outline' },
    { id: '8', title: 'SLA Agreement', screen: 'SLAAgreementScreen', icon: 'document-text-outline' },
    { id: '9', title: 'Log Out', screen: 'LogOutScreen', icon: 'log-out-outline' },
  ];

  const router = useRouter();

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      router.navigate(item.screen);
      setMenuModalVisible(false);
    }} style={styles.menuItem}>
      <Icon name={item.icon} size={24} color="gray" style={styles.menuIcon} />
      <Text style={styles.menuText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuModalVisible(true)} style={styles.menuIcon}>
          <Icon name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Log Out</Text>
      </View>

      {/* Logo Image */}
      <Image
        source={logo1} // Adjust path based on your file structure
        style={styles.logo}
      />

      <Text style={styles.text}>Are you sure you want to log out?</Text>

      {/* Log Out Confirmation Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => setLogoutModalVisible(true)}
      >
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>

      {/* Additional Logo Images */}
      <View style={styles.imageContainer}>
        <Image
          source={logo2} // Path to the second logo image
          style={styles.additionalLogo}
        />
        <Image
          source={logo3} // Path to the third logo image
          style={styles.additionalLogo}
        />
      </View>

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.confirmText}>Confirm Log Out</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.confirmLogoutButton}
                onPress={() => {
                  setLogoutModalVisible(false);
                  router.navigate('/LoginScreen'); // Ensure 'Login' matches your screen name
                }}
              >
                <Text style={styles.buttonText}>Yes, Log Out</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for Dropdown Menu */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuModalVisible}
        onRequestClose={() => setMenuModalVisible(false)}
      >
        <View style={styles.menuModalContainer}>
          <View style={styles.menuModalContent}>
            <FlatList
              data={menuItems}
              renderItem={renderMenuItem}
              keyExtractor={item => item.id}
            />
            <TouchableOpacity onPress={() => setMenuModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a6c8c',
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop: 30,
    width: '100%',
  },
  menuIcon: { marginRight: 15 },
  logo: {
    width: 100,  // Adjust the width as needed
    height: 100, // Adjust the height as needed
    marginTop: 20, // Space above the logo
    resizeMode: 'contain', // Maintain aspect ratio
  },
  additionalLogo: {
    width: 80,  // Set width for additional logos
    height: 80, // Set height for additional logos
    resizeMode: 'contain', // Maintain aspect ratio
    margin: 10, // Space between logos
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
  },
  logoutButton: {
    backgroundColor: '#ff3333',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  confirmLogoutButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  menuModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuModalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  menuText: { fontSize: 18, color: 'gray' },
  closeButton: {
    marginTop: 20,
    textAlign: 'center',
    color: 'blue',
    fontWeight: 'bold',
  },
  imageContainer: {
    flexDirection: 'row', // Arrange the logos in a row
    justifyContent: 'center', // Center the logos
    marginTop: 20, // Space above the logo container
  },
});

export default LogOutScreen;
