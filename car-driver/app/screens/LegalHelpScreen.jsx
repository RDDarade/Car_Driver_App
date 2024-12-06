import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { menuItems } from '../../components/lib/common/MenuItems'
import Sidebar from '../../components/lib/common/Sidebar'


const LegalHelpScreen = () => {
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

      {sidebarVisible ? <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        menuItems={menuItems}
        onMenuItemPress={handleMenuItemPress}
      /> : <></>}
    </View>
  );
};

const { width } = Dimensions.get('window'); // Get screen width

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
  }
});

export default LegalHelpScreen;
