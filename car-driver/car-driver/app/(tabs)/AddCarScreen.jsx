import { Picker } from '@react-native-picker/picker';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'; // Import Image from react-native
import Icon from 'react-native-vector-icons/Ionicons';

import logo1 from '../../assets/logo1.jpg'; // Your logo file

const Tab = createMaterialTopTabNavigator();

const AddCarScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
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
        <Tab.Screen name="Car Details" component={CarDetailsScreen} />
        <Tab.Screen name="Driver Details" component={DriverDetailsScreen} />
      </Tab.Navigator>

      {/* Modal with full height from left side */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Logo at the top of the modal */}
            <Image
              source={logo1}  // Adjust path based on your file structure
              style={styles.logo}
            />

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
      </Modal>
    </View>
  );
};

const CarDetailsScreen = () => {
  const [carBrand, setCarBrand] = useState('');
  const [carName, setCarName] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [fuelType, setFuelType] = useState('Petrol');
  const [seats, setSeats] = useState(4);
  const [addedCar, setAddedCar] = useState(null);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const addCar = () => {
    if (!carBrand || !carName || !carNumber) {
      alert("Please fill in all fields");
      return;
    }
    setAddedCar({
      carBrand,
      carName,
      carNumber,
      fuelType,
      seats,
    });
    setIsFormDisabled(true);
  };

  const resetForm = () => {
    setCarBrand('');
    setCarName('');
    setCarNumber('');
    setFuelType('Petrol');
    setSeats(4);
    setIsFormDisabled(false);
    setAddedCar(null);
  };

  return (
    <ScrollView style={styles.tabContent}>
      {addedCar ? (
        <View style={styles.card}>
          <Text style={styles.label}>Added Car Details:</Text>
          <View style={styles.card}>
            <Text>Brand: {addedCar.carBrand}</Text>
            <Text>Name: {addedCar.carName}</Text>
            <Text>Number: {addedCar.carNumber}</Text>
            <Text>Fuel Type: {addedCar.fuelType}</Text>
            <Text>Seats: {addedCar.seats}</Text>
          </View>
          <TouchableOpacity style={styles.resetButton} onPress={resetForm}>
            <Text style={styles.resetButtonText}>Add Another Car</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          {/* Select Car Card */}
          <View style={styles.card}>
            <Text style={styles.label}>Select Car</Text>
            <Picker
              selectedValue={carBrand}
              onValueChange={(itemValue) => setCarBrand(itemValue)}
              style={styles.picker}
              enabled={!isFormDisabled}
            >
              <Picker.Item label="Select a brand" value="" />
              <Picker.Item label="Toyota" value="Toyota" />
              <Picker.Item label="Honda" value="Honda" />
              <Picker.Item label="Ford" value="Ford" />
            </Picker>
          </View>

          {/* Car Details Card */}
          <View style={styles.card}>
            <Text style={styles.label}>Car Details</Text>
            <View style={styles.card}>
              <Text style={styles.label}>Car Name</Text>
              <Picker
                selectedValue={carName}
                onValueChange={(itemValue) => setCarName(itemValue)}
                style={styles.picker}
                enabled={!isFormDisabled}
              >
                <Picker.Item label="Select a car name" value="" />
                <Picker.Item label="Corolla" value="Corolla" />
                <Picker.Item label="Civic" value="Civic" />
                <Picker.Item label="Mustang" value="Mustang" />
              </Picker>
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>Car Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter car number"
                value={carNumber}
                onChangeText={(text) => setCarNumber(text)}
                editable={!isFormDisabled}
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>Fuel Type</Text>
              <Picker
                selectedValue={fuelType}
                onValueChange={(itemValue) => setFuelType(itemValue)}
                style={styles.picker}
                enabled={!isFormDisabled}
              >
                <Picker.Item label="Petrol" value="Petrol" />
                <Picker.Item label="Diesel" value="Diesel" />
                <Picker.Item label="Electric" value="Electric" />
              </Picker>
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>No. of seats</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={seats.toString()}
                onChangeText={(text) => setSeats(Number(text))}
                editable={!isFormDisabled}
              />
            </View>

            <TouchableOpacity style={styles.addButton} onPress={addCar}>
              <Text style={styles.addButtonText}>Add Car</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const DriverDetailsScreen = () => {
  const [driverName, setDriverName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [addedDriver, setAddedDriver] = useState(null);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const addDriver = () => {
    if (!driverName || !contactNumber) {
      alert("Please fill in all fields");
      return;
    }
    setAddedDriver({
      driverName,
      contactNumber,
    });
    setIsFormDisabled(true);
  };

  const resetForm = () => {
    setDriverName('');
    setContactNumber('');
    setIsFormDisabled(false);
    setAddedDriver(null);
  };

  return (
    <ScrollView style={styles.tabContent}>
      {addedDriver ? (
        <View style={styles.card}>
          <Text style={styles.label}>Added Driver Details:</Text>
          <View style={styles.card}>
            <Text>Name: {addedDriver.driverName}</Text>
            <Text>Contact: {addedDriver.contactNumber}</Text>
          </View>
          <TouchableOpacity style={styles.resetButton} onPress={resetForm}>
            <Text style={styles.resetButtonText}>Add Another Driver</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.label}>Driver Details</Text>
          <View style={styles.card}>
            <Text style={styles.label}>Driver Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter driver name"
              value={driverName}
              onChangeText={(text) => setDriverName(text)}
              editable={!isFormDisabled}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Contact Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter contact number"
              value={contactNumber}
              onChangeText={(text) => setContactNumber(text)}
              keyboardType="numeric"
              editable={!isFormDisabled}
            />
          </View>

          <TouchableOpacity style={styles.addButton} onPress={addDriver}>
            <Text style={styles.addButtonText}>Add Driver</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
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
    paddingHorizontal: 30,
    paddingTop:40
  },
  companyName: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  menuIcon: { marginRight: 35 },
  menuText: { fontSize: 18, color: 'gray' },
  modalContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  modalContent: {
    width: 250,
    backgroundColor: 'white',
    paddingTop: 30,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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
  logo: { width: 100, height: 50, marginBottom: 20, alignSelf: 'center' },
  closeButton: { position: 'absolute', bottom: 20, alignSelf: 'center' },
  closeButtonText: { textAlign: 'center', color: 'blue', fontWeight: 'bold', fontSize: 16 },
  tabContent: { padding: 10 },
  card: { marginBottom: 20, padding: 10, backgroundColor: 'white' },
  label: { fontWeight: 'bold' },
  picker: { height: 40 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 10, paddingHorizontal: 10 },
  addButton: { backgroundColor: 'blue', padding: 10, alignItems: 'center' },
  addButtonText: { color: 'white' },
  resetButton: { backgroundColor: 'green', padding: 10, alignItems: 'center' },
  resetButtonText: { color: 'white' },
});

export default AddCarScreen;
