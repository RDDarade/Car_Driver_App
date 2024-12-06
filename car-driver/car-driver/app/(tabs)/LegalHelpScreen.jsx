import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; // Import Dimensions
import Icon from 'react-native-vector-icons/Ionicons';

import logo1 from '../../assets/logo1.jpg';

const { width } = Dimensions.get('window'); // Get the screen width

const LegalHelpScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const [submenuVisible, setSubmenuVisible] = useState(false);
  

  // Menu items
  const menuItems = [
    { id: '0', title: 'Home', screen: 'HomeScreen', icon: 'home-outline' },
    { id: '1', title: 'Profile', screen: 'ProfileScreen', icon: 'person-outline' },
    { id: '2', title: 'Wallet', screen: 'WalletScreen', icon: 'wallet-outline' },
    { id: '3', title: 'Add Car', screen: 'AddCarScreen', icon: 'car-outline' },
    { id: '4', title: 'Legal Help', screen: 'LegalHelpScreen', icon: 'help-circle-outline' },
    { id: '5', title: 'My Booking', screen: null, icon: 'ribbon-outline', isParent: true },
    { id: '5.1', title: 'Active Booking', screen: 'ActiveBookingScreen', icon: 'checkmark-circle-outline', parentId: '5' },
    { id: '5.2', title: 'Booking History', screen: 'BookingHistoryScreen', icon: 'time-outline', parentId: '5' },
    { id: '5.3', title: 'My Booking Details', screen: 'MyBookingDetailsScreen', icon: 'information-circle-outline', parentId: '5' },
    { id: '6', title: 'B2B Agents', screen: 'B2BAgentsScreen', icon: 'business-outline' },
    { id: '7', title: 'Penalty', screen: 'PenaltyScreen', icon: 'alert-circle-outline' },
    { id: '8', title: 'SLA Agreement', screen: 'SLAAgreementScreen', icon: 'document-text-outline' },
    { id: '9', title: 'Log Out', screen: 'LogOutScreen', icon: 'log-out-outline' },
  ];

  // Handle menu item press
  const handleMenuItemPress = (item) => {
    if (item.isParent) {
      setSubmenuVisible(prevState => !prevState);  // Toggle submenu visibility for "My Booking"
    } else {
      router.navigate(item.screen);
      setModalVisible(false);
    }
  };

  // Render each menu item
  const renderMenuItem = ({ item }) => {
    const isSubMenu = item.parentId === '5';

    // Don't render submenu if hidden
    if (isSubMenu && !submenuVisible) return null;

    return (
      <TouchableOpacity
        onPress={() => handleMenuItemPress(item)}
        style={[styles.menuItem, isSubMenu && styles.subMenuItem]}  // Apply styles conditionally
      >
        <Icon name={item.icon} size={24} color="gray" style={styles.menuIcon} />
        <Text style={[styles.menuText, isSubMenu && styles.subMenuText]}>{item.title}</Text>  {/* Submenu item styling */}
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
      {/* Header with Hamburger Menu and Phone Icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.menuButton}>
          <Icon name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Legal Help</Text>
        <TouchableOpacity style={styles.phoneIcon}>
          <Icon name="call" size={25} color="white" />
        </TouchableOpacity>
      </View>

      {/* Helpline Number and Email Boxes */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.infoBox}>
          <Text style={styles.labelText}>Help Line Number</Text>
          <Text style={styles.infoText}>+91 817 871 0350</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.labelText}>Help Line Email</Text>
          <Text style={styles.infoText}>help@legalhelp.com</Text>
        </View>
      </ScrollView>

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

  // Phone Icon Button
  phoneButton: {
    marginLeft: 10,
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

  // Submenu item styling (smaller size)
  subMenuItem: {
    paddingLeft: 30,  // Indent submenu items
    paddingVertical: 2,
  },
  subMenuText: {
    fontSize: 10,  // Smaller font for submenu items
    color: 'gray',
  },
  // Menu items
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  menuIcon: { marginRight: 35 },
  menuText: { fontSize: 18, color: 'gray' },

  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70, // to avoid overlap with the header
  },
  infoBox: {
    width: width * 0.9, // 90% of the screen width
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    borderRightWidth: 5, // Right border thickness
    borderRightColor: '#00c0f0', // Right border color (matches image)
  },
  labelText: {
    fontSize: 16,
    color: '#333',
  },
  infoText: {
    fontSize: 22,
    color: '#00c0f0', // Blue color for the main text
    fontWeight: 'bold',
    marginTop: 5,
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

export default LegalHelpScreen;
