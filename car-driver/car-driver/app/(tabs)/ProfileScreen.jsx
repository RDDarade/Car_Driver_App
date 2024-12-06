import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import logo1 from '../../assets/logo1.jpg';

const ProfileScreen = () => {
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(false); // To toggle submenu visibility
  const [selectedButton, setSelectedButton] = useState(null); // Track selected button
  const [isEditing, setIsEditing] = useState({ phone: false, email: false, pan: false }); // Track editable fields
  const [profileData, setProfileData] = useState({
    phone: '8178710350',
    email: 'onlineshopping1857@gmail.com',
    pan: 'AHDPL8932E',
  });

  const [showPaytmNumber, setShowPaytmNumber] = useState(false);  // Add this state
  const [showBankDetails, setShowBankDetails] = useState(false);   // Add this state
  const [showUpiID, setShowUpiID] = useState(false);               // Add this state

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

  const handleMenuItemPress = (item) => {
    if (item.isParent) {
      setSubmenuVisible((prevState) => !prevState);
    } else {
      setSelectedButton(item.id); // Set the selected button
      router.navigate(item.screen);
      setModalVisible(false);
    }
  };

  const renderMenuItem = ({ item }) => {
    const isSubMenu = item.parentId === '5';
    if (isSubMenu && !submenuVisible) return null;

    const isSelected = selectedButton === item.id;

    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => handleMenuItemPress(item)}
        style={[
          styles.menuItem,
          isSubMenu && styles.subMenuItem,
          isSelected && styles.selectedMenuItem,
        ]}
      >
        <Icon name={item.icon} size={24} color={isSelected ? 'blue' : 'gray'} style={styles.menuIcon} />
        <Text style={[styles.menuText, isSubMenu && styles.subMenuText, isSelected && { color: 'blue' }]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSave = (field) => {
    setIsEditing({ ...isEditing, [field]: false });
  };

  return (
    <View style={styles.container}>
      {/* Header with Hamburger Menu */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.menuButton}>
          <Icon name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
        <TouchableOpacity style={styles.phoneIcon}>
          <Icon name="call" size={25} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile content */}
      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
          <Image
            source={require('../../assets/IMG_0102-removebg-preview.jpg')} // replace with actual image URL
            style={styles.profileImage}
          />
          <Text style={styles.nameText}>Sachin Haribhau Lahudkar</Text>
        </View>
        <Text style={styles.infoText}>Happiness Car Rental Service</Text>

        {/* Editable profile fields */}
        <View style={styles.infoRow}>
          <Icon name="call-outline" size={20} color="black" />
          {isEditing.phone ? (
            <View style={styles.editField}>
              <TextInput
                value={profileData.phone}
                onChangeText={(text) => setProfileData({ ...profileData, phone: text })}
                style={styles.textInput}
              />
              <TouchableOpacity onPress={() => handleSave('phone')}>
                <Icon name="checkmark-circle" size={20} color="green" />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.infoText}>{profileData.phone}</Text>
              <TouchableOpacity onPress={() => handleEdit('phone')}>
                <Icon name="pencil" size={18} color="black" />
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.infoRow}>
          <Icon name="mail-outline" size={20} color="black" />
          {isEditing.email ? (
            <View style={styles.editField}>
              <TextInput
                value={profileData.email}
                onChangeText={(text) => setProfileData({ ...profileData, email: text })}
                style={styles.textInput}
              />
              <TouchableOpacity onPress={() => handleSave('email')}>
                <Icon name="checkmark-circle" size={20} color="green" />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.infoText}>{profileData.email}</Text>
              <TouchableOpacity onPress={() => handleEdit('email')}>
                <Icon name="pencil" size={18} color="black" />
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.infoRow}>
          <Icon name="card-outline" size={20} color="black" />
          {isEditing.pan ? (
            <View style={styles.editField}>
              <TextInput
                value={profileData.pan}
                onChangeText={(text) => setProfileData({ ...profileData, pan: text })}
                style={styles.textInput}
              />
              <TouchableOpacity onPress={() => handleSave('pan')}>
                <Icon name="checkmark-circle" size={20} color="green" />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.infoText}>{profileData.pan}</Text>
              <TouchableOpacity onPress={() => handleEdit('pan')}>
                <Icon name="pencil" size={18} color="black" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {/* Payment Info */}
      <View style={styles.paymentContainer}>
        <Text style={styles.sectionTitle}>Account to receive Payments</Text>
        <View style={styles.paymentOptions}>
          <TouchableOpacity
            style={[styles.paymentButton, { backgroundColor: selectedButton === 'paytm' ? '#0000ff' : '#d3d3d3' }]}
            onPress={() => {
              setShowPaytmNumber(!showPaytmNumber);
              setShowBankDetails(false);
              setShowUpiID(false);
              setSelectedButton('paytm'); // set 'paytm' as selected
            }}
          >
            <Text style={styles.paymentButtonText}>PAYTM No.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.paymentButton, { backgroundColor: selectedButton === 'bank' ? '#0000ff' : '#d3d3d3' }]}
            onPress={() => {
              setShowBankDetails(!showBankDetails);
              setShowPaytmNumber(false);
              setShowUpiID(false);
              setSelectedButton('bank'); // set 'bank' as selected
            }}
          >
            <Text style={styles.paymentButtonText}>BANK Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.paymentButton, { backgroundColor: selectedButton === 'upi' ? '#0000ff' : '#d3d3d3' }]}
            onPress={() => {
              setShowUpiID(!showUpiID);
              setShowBankDetails(false);
              setShowPaytmNumber(false);
              setSelectedButton('upi'); // set 'upi' as selected
            }}
          >
            <Text style={styles.paymentButtonText}>UPI ID</Text>
          </TouchableOpacity>
        </View>

        {showUpiID && (
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>8178710350@ybl</Text>
            <TouchableOpacity>
              <Icon name="pencil" size={18} color="black" />
            </TouchableOpacity>
          </View>
        )}

        {showPaytmNumber && (
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>8178710350</Text>
            <TouchableOpacity>
              <Icon name="pencil" size={18} color="black" />
            </TouchableOpacity>
          </View>
        )}
        {showBankDetails && (
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Bank Account Number: 1234567890</Text>
            <TouchableOpacity>
              <Icon name="pencil" size={18} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>Aadhaar and PAN verified</Text>

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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
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
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },

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

  profileContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    marginRight: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  editField: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    marginRight: 10,
  },
  paymentContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  paymentButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  paymentButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 10,
  },
});

export default ProfileScreen;
