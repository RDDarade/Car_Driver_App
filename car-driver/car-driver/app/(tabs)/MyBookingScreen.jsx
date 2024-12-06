import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import logo1 from '../../assets/logo1.jpg';

const MyBookingScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(false);  // Track visibility of submenu
  const router = useRouter();

  // Define menu items including submenu for My Booking
  const menuItems = [
    { id: '0', title: 'Home', screen: 'HomeScreen', icon: 'home-outline' },
    { id: '1', title: 'Profile', screen: 'ProfileScreen', icon: 'person-outline' },
    { id: '2', title: 'Wallet', screen: 'WalletScreen', icon: 'wallet-outline' },
    { id: '3', title: 'Add Car', screen: 'AddCarScreen', icon: 'car-outline' },
    { id: '4', title: 'Legal Help', screen: 'LegalHelpScreen', icon: 'help-circle-outline' },
    
    // My Booking (parent) and submenu items
    { id: '5', title: 'My Booking', screen: null, icon: 'ribbon-outline', isParent: true },
    { id: '5.1', title: 'Active Booking', screen: 'ActiveBookingScreen', icon: 'checkmark-circle-outline', parentId: '5' },
    { id: '5.2', title: 'Booking History', screen: 'BookingHistoryScreen', icon: 'time-outline', parentId: '5' },
    { id: '5.3', title: 'My Booking Details', screen: 'MyBookingDetailsScreen', icon: 'information-circle-outline', parentId: '5' },

    { id: '6', title: 'B2B Agents', screen: 'B2BAgentsScreen', icon: 'business-outline' },
    { id: '7', title: 'Penalty', screen: 'PenaltyScreen', icon: 'alert-circle-outline' },
    { id: '8', title: 'SLA Agreement', screen: 'SLAAgreementScreen', icon: 'document-text-outline' },
    { id: '9', title: 'Log Out', screen: 'LogOutScreen', icon: 'log-out-outline' },
  ];

  // Function to handle menu item click
  const handleMenuItemPress = (item) => {
    if (item.isParent) {
      // Toggle the submenu visibility when My Booking is clicked
      setSubmenuVisible(prevState => !prevState);
    } else {
      // Navigate to the respective screen for non-parent items
      router.navigate(item.screen);
      setModalVisible(false);
    }
  };

  // Function to render each menu item
  const renderMenuItem = ({ item }) => {
    // If item is a submenu, it is only shown if submenu is visible
    const isSubMenu = item.parentId === '5';

    // Do not render submenu items if submenu is hidden
    if (isSubMenu && !submenuVisible) return null;

    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => handleMenuItemPress(item)}
        style={[styles.menuItem, isSubMenu && styles.subMenuItem]} // Apply styles conditionally
      >
        <Icon name={item.icon} size={24} color="gray" style={styles.menuIcon} />
        <Text style={[styles.menuText, isSubMenu && styles.subMenuText]}>{item.title}</Text> {/* Adjust font size for submenu */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with Hamburger Menu */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.menuButton}>
          <Icon name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Booking</Text>
      </View>

      {/* Sidebar Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.menuModalContent}>
            {/* Logo Section with Image */}
            <View style={styles.logoContainer}>
              <Image
                source={logo1}
                style={styles.logoImage}
              />
            </View>
            <FlatList
              data={menuItems}
              renderItem={renderMenuItem}
              keyExtractor={item => item.id}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f0f0f0' 
  },

  // Header section
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0a6c8c',
    paddingVertical: 20,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },

  // Modal Overlay
  modalContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  menuModalContent: {
    width: 250,
    backgroundColor: 'white',
    paddingTop: 30,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  // Logo positioning
  logoContainer: {
    alignSelf: 'center', // Moves logo to the right side of the top
    marginBottom: 20,
  },
  logoImage: { 
    width: 100, 
    height: 50, 
    resizeMode: 'contain' 
  },

  // Menu items
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  menuIcon: { marginRight: 35 },
  menuText: { fontSize: 18, color: 'gray' },

  // Submenu item styling (smaller size)
  subMenuItem: {
    paddingLeft: 30,  // Indent submenu items
    paddingVertical: 2,
  },
  subMenuText: {
    fontSize: 10,  // Smaller font for submenu items
    color: 'gray',
  },

  // Close Button
  closeButton: { 
    position: 'absolute', 
    bottom: 20, 
    alignSelf: 'center' 
  },
  closeButtonText: { 
    textAlign: 'center', 
    color: 'blue', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
});

export default MyBookingScreen;
