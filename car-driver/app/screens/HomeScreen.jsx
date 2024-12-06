import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRouter } from 'expo-router';
import { menuItems } from '../../components/lib/common/MenuItems.js'
import Sidebar from '../../components/lib/common/Sidebar';

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  const router = useRouter();
  
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const handleMenuItemPress = (item) => {
    if (item.screen) {
      router.navigate(`/screens/${item.screen}`); // Navigate to the screen specified in the menu item
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)}>
          <Icon name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.companyName}>Happiness Car Rental</Text>
        <TouchableOpacity>
          <Icon name="call" size={25} color="white" />
        </TouchableOpacity>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
          tabBarStyle: { backgroundColor: 'black' },
          tabBarIndicatorStyle: { backgroundColor: 'white' },
        }}
      >
        <Tab.Screen name="New Booking" component={NewBookingScreen} />
        <Tab.Screen name="Active Booking" component={ActiveBookingScreen} />
      </Tab.Navigator>

      {/* Modal with full height from left side */}
      {/* <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={menuItems}
              renderItem={renderMenuItem}
              keyExtractor={item => item.id}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}


      {sidebarVisible ? <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        menuItems={menuItems}
        onMenuItemPress={handleMenuItemPress}
      /> : <></>}
    </View>
  );
};

const NewBookingScreen = () => {
  const bookingData = [
    {
      id: '1',
      title: 'Hotel near Railway Station Akola Jn.',
      pickupLocation: 'Akola, Maharashtra, India',
      dropLocation: 'Daryapur, Maharashtra, India',
      price: '1324.98',
      carType: 'HATCHBACK (AC)',
      distance: '50.0 KM',
      extraCharges: 'Rs 10.7/km',
      driverCharges: 'Included',
      departure: 'Mar 17, 2024 10:00 am',
    },

    {
      id: '2',
      title: 'Airport Transfer from Mumbai',
      pickupLocation: 'Chhatrapati Shivaji Maharaj International Airport, Mumbai',
      dropLocation: 'Dadar, Mumbai, India',
      price: '2500.00',
      carType: 'SEDAN (AC)',
      distance: '30.5 KM',
      extraCharges: 'Rs 15/km',
      driverCharges: 'Included',
      departure: 'Mar 18, 2024 02:00 pm',
    },

    {
      id: '3',
      title: 'Trip to Pune City Center',
      pickupLocation: 'Nagpur, Maharashtra, India',
      dropLocation: 'Pune, Maharashtra, India',
      price: '4500.50',
      carType: 'SUV (AC)',
      distance: '180.0 KM',
      extraCharges: 'Rs 12/km',
      driverCharges: 'Included',
      departure: 'Mar 19, 2024 09:00 am',
    },

    // other booking items...
  ];

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <View style={styles.headerRow}>
        <Text style={styles.tripType}>ONE WAY TRIP</Text>
        <Text style={styles.paymentStatus}>Paid by Cash</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pickup:</Text>
        <View style={styles.locationRow}>
          <Icon name="location-sharp" size={20} color="#0a6c8c" />
          <Text style={styles.sectionValue}>{item.title}</Text>
        </View>
        <View style={styles.locationRow}>
          <Icon name="arrow-up-circle-outline" size={20} color="green" />
          <Text style={styles.locationText}>{item.pickupLocation}</Text>
        </View>
        <View style={styles.locationRow}>
          <Icon name="arrow-down-circle-outline" size={20} color="red" />
          <Text style={styles.locationText}>{item.dropLocation}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.sectionRow}>
        <View style={styles.detailBox}>
          <Icon name="cash-outline" size={20} color="black" />
          <Text style={styles.detailText}>Rs {item.price}</Text>
        </View>
        <View style={styles.dottedLine}></View>
        <View style={styles.detailBox}>
          <Icon name="car-sport-outline" size={20} color="black" />
          <Text style={styles.detailText}>{item.carType}</Text>
        </View>
        <View style={styles.dottedLine}></View>
        <View style={styles.detailBox}>
          <Icon name="location-outline" size={20} color="black" />
          <Text style={styles.detailText}>{item.distance}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.extraInfoContainer}>
        <Text style={styles.extraInfoText}>{item.extraCharges} (for extra km)</Text>
        <Text style={styles.extraInfoText}>{item.driverCharges} (driver charge)</Text>
      </View>

      <Text style={styles.tollInfo}>Toll & State Tax Extra | Parking Extra, if applicable</Text>

      <View style={styles.divider} />

      <View style={styles.footerRow}>
        <Text style={styles.dateText}>Departure: {item.departure}</Text>
      </View>

      <TouchableOpacity
        style={styles.acceptButton}
        onPress={() => alert(`Accepted trip from ${item.pickupLocation}`)}
      >
        <Text style={styles.acceptButtonText}>ACCEPT</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.tabContent}>
      <FlatList
        data={bookingData}
        renderItem={renderBookingItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const ActiveBookingScreen = () => (
  <View style={styles.tabContent}>
    <Text style={styles.noDataText}>No Active Bookings Available</Text>
  </View>
);

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
  companyName: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  // menuIcon: { marginRight: 15 },
  // menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  // menuText: { fontSize: 18, color: '#333', marginLeft: 10 },
  // modalContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  // },
  // modalContent: {
  //   width: '80%',
  //   backgroundColor: '#fff',
  //   borderRadius: 10,
  //   padding: 20,
  // },
  // closeButton: {
  //   backgroundColor: '#FFB400',
  //   padding: 10,
  //   borderRadius: 5,
  //   marginTop: 20,
  //   backgroundColor: '#FFB400',
  //   paddingVertical: 10,
  //   paddingHorizontal: 80,
  //   borderRadius: 5,
  //   marginTop: 20,
  // },
  // closeButtonText: {
  //   color: '#fff',
  //   fontSize: 16,
  //   textAlign: 'center',
  // },
  tabContent: { flex: 1, padding: 10 },
  bookingItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  section: { marginBottom: 10 },
  sectionTitle: { fontWeight: 'bold', color: '#0a6c8c', fontSize: 14 },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontSize: 14, color: 'black' },
  sectionValue: { fontSize: 16, fontWeight: 'bold', color: 'black' },
  divider: { height: 1, backgroundColor: '#ddd', marginVertical: 10 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  detailBox: { flexDirection: 'row', alignItems: 'center' },
  detailText: { marginLeft: 5 },
  dottedLine: { borderWidth: 0.5, borderColor: '#ddd', borderStyle: 'dotted', flex: 1 },
  extraInfoContainer: { marginVertical: 10 },
  extraInfoText: { fontSize: 14, color: '#555' },
  tollInfo: { fontSize: 12, color: '#555' },
  footerRow: { marginTop: 15 },
  dateText: { fontSize: 14, color: 'black' },
  acceptButton: {
    backgroundColor: '#0a6c8c',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  acceptButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  noDataText: { fontSize: 18, textAlign: 'center', marginTop: 20 },
});

export default HomeScreen;
