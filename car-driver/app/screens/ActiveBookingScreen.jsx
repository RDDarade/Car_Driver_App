// app/ActiveBookingScreen.js
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { menuItems } from '../../components/lib/common/MenuItems'
import Sidebar from '../../components/lib/common/Sidebar'

const ActiveBookingScreen = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const handleMenuItemPress = (item) => {
    if (item.screen) {
      router.navigate(`/screens/${item.screen}`); // Navigate to the screen specified in the menu item
    }
  };
  const router = useRouter();



  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.menuIcon}>
          <Icon name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Active Bookings</Text>
        <TouchableOpacity style={styles.phoneIcon}>
          <Icon name="call" size={25} color="white" />
        </TouchableOpacity>
      </View>


      <Text>Active Booking Screen</Text>


      {/* Modal for Dropdown Menu */}
      {sidebarVisible ? <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        menuItems={menuItems}
        onMenuItemPress={handleMenuItemPress}
      /> : <></>}
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0a6c8c',
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  phoneIcon: {
    paddingHorizontal: 10,
  },
  scrollBox: {
    flex: 1,
    width: '100%', // Full width of the container
    padding: 10, // Padding around the box
    backgroundColor: '#fff', // Background color for the scrolling box
    borderRadius: 10, // Rounded corners
    marginTop: 20, // Space between header and scroll box
    elevation: 2, // Add shadow for Android
  },
  agreementContainer: {
    padding: 10, // Padding inside the ScrollView
  },
  agreementText: {
    fontSize: 16,
    lineHeight: 24,
  }
});

export default ActiveBookingScreen;
