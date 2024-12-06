import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRouter } from 'expo-router';


import { menuItems } from '../../components/lib/common/MenuItems'
import Sidebar from '../../components/lib/common/Sidebar'
import CarDetailsScreen from './CarDetailsScreen';
import DriverDetailsScreen from './DriverDetailsScreen';

const Tab = createMaterialTopTabNavigator();

const AddCarScreen = () => {

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const handleMenuItemPress = (item) => {
    if (item.screen) {
      router.navigate(`/screens/${item.screen}`);
    }
  };

  const router = useRouter();



  return (
    <>
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
          <Tab.Screen name="Car Details" component={CarDetailsScreen} />
          <Tab.Screen name="Driver Details" component={DriverDetailsScreen} />
        </Tab.Navigator>


        {sidebarVisible ? <Sidebar
          visible={sidebarVisible}
          onClose={() => setSidebarVisible(false)}
          menuItems={menuItems}
          onMenuItemPress={handleMenuItemPress}
        /> : <></>}

      </View>
    </>
  );
};


const styles = StyleSheet.create({
  usersContainer: { marginTop: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginStart: 10 },
  userCard: { padding: 15, backgroundColor: '#fff', marginBottom: 10, borderRadius: 10, elevation: 2 },
  userName: { fontSize: 16, fontWeight: 'bold' },
  userContact: { fontSize: 14, color: '#555' },
  noUsers: { textAlign: 'center', color: '#999', marginTop: 20 },
  addButton1: { backgroundColor: '#0a6c8c', padding: 15, borderRadius: 10, alignItems: 'center', margin: 5 },
  addButtonText1: { color: 'white', fontSize: 18 },
  modalContainer1: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent1: { width: '85%', backgroundColor: '#fff', borderRadius: 20, padding: 20 },
  closeButton1: { alignSelf: 'flex-end' },
  modalTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between' },
  formInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    marginHorizontal: 5,
    height: 50,
  },
  fileButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    borderRadius: 10,
    margin: 3,
    alignItems: 'center',
  },
  fileButtonText: {
    color: '#999',
    textAlign: 'center',
  },
  submitButton: { backgroundColor: '#0a6c8c', padding: 15, borderRadius: 10, alignItems: 'center' },
  submitButtonText: { color: 'white', fontSize: 18 },
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
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

  tabContent: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 5,
    borderRadius: 5,
  },
  picker: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#0a6c8c',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  previewContainer: {
    marginTop: 20,
  },
  previewHeading: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default AddCarScreen;
