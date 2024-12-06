import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Image, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { menuItems } from '../../components/lib/common/MenuItems';
import { useGlobalContext } from '../../context/GlobalProvider'
import * as DocumentPicker from 'expo-document-picker';
import Sidebar from '../../components/lib/common/Sidebar'


const ProfileScreen = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const handleMenuItemPress = (item) => {
    if (item.screen) {
      router.navigate(`/screens/${item.screen}`); // Navigate to the screen specified in the menu item
    }
  };

  const [showPaytmNumber, setShowPaytmNumber] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [showUpiID, setShowUpiID] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { user_id } = useGlobalContext();

  const [inputModal, setInputModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    driver_name: '',
    driver_mobile: '',
    aadhar_card: '',
    pan_card: '',
    license_no: '',
    address: '',
    account_number: '',
    upi_id: '',
    aadhar_file: null,
    aadhar_back: null,
    pan_file: null,
    license_file: null,
    profile_path: null,
  });

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // Fetch user profile by ID
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`https://happinesscarrental.com/admin/users/get_user_by_id/${user_id}`);
        setUserData(response.data.data);
      } catch (error) {
        console.log("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [uploading]);




  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB in bytes


  const handleFileSelect = async (field) => {
    try {
      // Pick the document
      console.log('Field:', field);
      const res = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
      });

      // Check if the user canceled the picker
      if (res.canceled) {
        console.log('User canceled the picker');
        return;
      }

      const file = res.assets && res.assets[0]; // Get the first file from the assets
      if (!file || !file.uri) {
        throw new Error('Invalid file URI');
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        alert('File size should be less than 2 MB');
        return;
      }

      // Fetch file content (returns a Blob)
      const fileContent = await fetch(file.uri);
      const blob = await fileContent.blob(); // Extract the Blob object
      console.log("blob: ", blob);

      // Update form data with the file object
      setFormData((prevData) => {
        const updatedData = { ...prevData, [field]: blob };
        console.log('Updated form data:', updatedData);
        return updatedData;
      });

    } catch (err) {
      console.error('Error selecting file:', err);
      alert('Error selecting the file. Please try again.');
    }
  };

  const validateForm = (formData) => {
    if (formData.driver_name && formData.driver_name.length < 3) {
      return { isValid: false, message: 'Please enter valid driver name.' };
    }
    if (formData.driver_mobile && formData.driver_mobile.length !== 10) {
      return { isValid: false, message: 'Please enter valid mobile number.' };
    }
    if (formData.aadhar_card && formData.aadhar_card.length !== 12) {
      return { isValid: false, message: 'Please enter a valid Aadhar card number' };
    }
    if (formData.pan_card && formData.pan_card.length !== 10) {
      return { isValid: false, message: 'Please enter valid PAN card number' };
    }
    if (formData.license_no && formData.license_no.length !== 15) {
      return { isValid: false, message: 'Please enter valid license number' };
    }
    if (formData.address && formData.address.length < 3) {
      return { isValid: false, message: 'Please enter valid address' };
    }
    if (formData.account_number && formData.account_number.length < 4) {
      return { isValid: false, message: 'Please enter valid account number' };
    }
    return { isValid: true };
  };

  const handleSubmit = async () => {
    try {
      setUploading(true);
      const validationResult = validateForm(formData);
      if (!validationResult.isValid) {
        setUploading(false);
        alert(validationResult.message);
        return;
      }

      const data = new FormData();

      // Append text fields and files to FormData
      for (let key of Object.keys(formData)) {
        const value = formData[key];

        if (value && value._data) {
          const fileData = value._data;
          const fileContent = await fetch(fileData.uri);
          const blob = await fileContent.blob();
          data.append(key, blob, fileData.name || `${key}.file`);
        } else {
          if (value != null && value != "") data.append(key, value);
        }
      }
      // API request
      const response = await axios.post('https://happinesscarrental.com/admin/users/update_profile', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handling response
      if (response.data.status == false) throw new Error(response.data.message);
      alert('Details updated successfully!');
      clearForm();
      setUploading(false);
      setInputModal(false);
    } catch (error) {
      console.error('Error uploading data:', error.message);
      alert('Error uploading data. Please try again.');
      clearForm();
      setUploading(false);
      setInputModal(false);
    }
  };


  const clearForm = () => {
    setFormData({
      driver_name: '',
      driver_mobile: '',
      aadhar_card: '',
      pan_card: '',
      license_no: '',
      address: '',
      account_number: '',
      upi_id: '',
      aadhar_file: null,
      aadhar_back: null,
      pan_file: null,
      license_file: null,
      profile_path: null,
    });
  };


  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0a6c8c" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.menuIcon}>
          <Icon name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
        <TouchableOpacity style={styles.phoneIcon}>
          <Icon name="call" size={25} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
          <Image
            source={
              userData?.profilePhoto
                ? { uri: userData.profile_path }
                : require('../../assets/image.png')
            }
            style={styles.profileImage}
          />
          <Text style={styles.nameText}>
            {userData?.driver_name || 'User'}
          </Text>
          <TouchableOpacity style={styles.updateBtn} onPress={() => setInputModal(true)}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Update</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.infoText}>Happiness Car Rental</Text>
        <View style={styles.infoRow}>
          <Icon name="call-outline" size={20} color="black" />
          <Text style={styles.infoText}>{userData?.driver_mobile ? ` ${userData?.driver_mobile}` : ' Not Updated'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="card-outline" size={20} color="black" />
          <Text style={styles.infoText}>{userData?.pan_card ? ` ${userData?.pan_card}` : ' Not Updated'}</Text>
        </View>
      </View>

      <View style={styles.paymentContainer}>
        <Text style={styles.sectionTitle}>Account to receive Payments</Text>
        <View style={styles.paymentOptions}>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={() => {
              setShowPaytmNumber(!showPaytmNumber);
              setShowBankDetails(false);
              setShowUpiID(false);
            }}
          >
            <Text style={styles.paymentButtonText}>PAYTM No.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={() => {
              setShowBankDetails(!showBankDetails);
              setShowPaytmNumber(false);
              setShowUpiID(false);
            }}
          >
            <Text style={styles.paymentButtonText}>BANK Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={() => {
              setShowUpiID(!showUpiID);
              setShowBankDetails(false);
              setShowPaytmNumber(false);
            }}
          >
            <Text style={styles.paymentButtonText}>UPI ID</Text>
          </TouchableOpacity>
        </View>

        {showUpiID && (
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>{userData?.upi_id || ''}</Text>
          </View>
        )}

        {showPaytmNumber && (
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>{userData?.driver_mobile || ''}</Text>
          </View>
        )}
        {showBankDetails && (
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>{userData?.account_number || ''}</Text>
          </View>
        )}
      </View>

      <Text style={styles.footerText}>{(userData?.is_aadhar === 1 && userData?.is_aadharback === 1 && userData?.is_pan === 1) ? 'Aadhaar and PAN verified' : ''}</Text>



      <Modal
        animationType="slide"
        transparent={true}
        visible={inputModal}
        onRequestClose={() => setInputModal(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalContainer1}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalContent1}>
            <TouchableOpacity
              style={styles.closeButton1}
              onPress={() => {
                setInputModal(false);
                clearForm();
              }}
            >
              <Icon name="close" size={24} color="#0a6c8c" />
            </TouchableOpacity>

            <ScrollView>
              <Text style={styles.modalTitle}>Add Driver Details</Text>

              {/* Input Fields */}
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.formInput}
                  placeholder={userData?.driver_name ? userData?.driver_name : "Driver Name"}
                  placeholderTextColor={'#777'}
                  value={formData.driver_name}
                  onChangeText={(text) => handleInputChange('driver_name', text)}
                />
                <TextInput
                  style={styles.formInput}
                  placeholder={userData?.driver_mobile ? userData?.driver_mobile : "Contact Number"}
                  placeholderTextColor={'#777'}
                  value={formData.driver_mobile}
                  onChangeText={(text) => handleInputChange('driver_mobile', text)}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputRow}>
                <TextInput
                  style={styles.formInput}
                  placeholder={userData?.aadhar_card ? userData?.aadhar_card : "Aadhar Number"}
                  placeholderTextColor={'#777'}
                  value={formData.aadhar_card}
                  onChangeText={(text) => handleInputChange('aadhar_card', text.replace(/\s/g, ''))}
                />
                <TextInput
                  style={styles.formInput}
                  placeholder={userData?.pan_card ? userData?.pan_card : "PAN Number"}
                  placeholderTextColor={'#777'}
                  value={formData.pan_card}
                  onChangeText={(text) => handleInputChange('pan_card', text.replace(/\s/g, ''))}
                />
              </View>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.formInput}
                  placeholder={userData?.license_no ? userData?.license_no : "License Number"}
                  placeholderTextColor={'#777'}
                  value={formData.license_no}
                  onChangeText={(text) => handleInputChange('license_no', text.replace(/\s/g, ''))}
                />
                <TextInput
                  style={styles.formInput}
                  placeholder={userData?.address ? userData?.address : "Address"}
                  placeholderTextColor={'#777'}
                  value={formData.address}
                  onChangeText={(text) => handleInputChange('address', text)}
                />
              </View>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.formInput}
                  placeholder={userData?.account_number != 0 ? userData?.account_number : "Account Number"}
                  placeholderTextColor={'#777'}
                  value={formData.account_number}
                  onChangeText={(text) => handleInputChange('account_number', text)}
                  keyboardType='numeric'
                />
                <TextInput
                  style={styles.formInput}
                  placeholder={userData?.upi_id ? userData?.upi_id : "UPI ID"}
                  placeholderTextColor={'#777'}
                  value={formData.upi_id}
                  onChangeText={(text) => handleInputChange('upi_id', text)}
                />
              </View>

              {/* File Selectors */}

              <View style={styles.inputRow}>
                {userData?.is_aadhar == 0 ? <TouchableOpacity style={styles.formInput} onPress={() => handleFileSelect('aadhar_file')}>
                  <Text style={{ color: '#777' }}>
                    {userData?.aadhar_file ? 'Aadhar Front ✔' : (formData.aadhar_file ? 'Aadhar Front ✔' : 'Select AadharFront')}
                  </Text>
                </TouchableOpacity> : <></>}

                {userData?.is_aadharback == 0 ? <TouchableOpacity style={styles.formInput} onPress={() => handleFileSelect('aadhar_back')}>
                  <Text style={{ color: '#777' }}>
                    {userData?.aadhar_back ? 'Aadhar Back ✔' : (formData.aadhar_back ? 'Aadhar Back ✔' : 'Select AadharBack')}
                  </Text>
                </TouchableOpacity> : <></>}
              </View>

              <View style={styles.inputRow}>
                {userData?.is_pan == 0 ? <TouchableOpacity style={styles.formInput} onPress={() => handleFileSelect('pan_file')}>
                  <Text style={{ color: '#777' }}>
                    {userData?.pan_file ? 'PAN File ✔' : (formData.pan_file ? 'PAN File ✔' : 'Select PAN')}
                  </Text>
                </TouchableOpacity> : <></>}

                {userData?.is_license ? <TouchableOpacity style={styles.formInput} onPress={() => handleFileSelect('license_file')}>
                  <Text style={{ color: '#777' }}>
                    {userData?.license_file ? 'License File ✔' : (formData.license_file ? 'License File ✔' : 'Select License')}
                  </Text>
                </TouchableOpacity> : <></>}
              </View>

              <TouchableOpacity style={styles.formInput} onPress={() => handleFileSelect('profile_path')}>
                <Text style={{ color: '#777' }}>
                  {userData?.profile_path ? 'Profile File ✔' : (formData.profile_path ? 'Profile File ✔' : 'Select Profile Image')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitButton} onPress={() => { handleSubmit() }} disabled={uploading}>
                {uploading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>Submit</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>




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
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold', // Added this line to make the text bold
  },

  companyName: { color: 'white', fontSize: 20, fontWeight: 'bold' },
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
    marginVertical: 8,
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
    backgroundColor: '#0000ff',
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
  updateBtn: {
    borderRadius: 10,
    backgroundColor: '#0a6c8c',
    padding: 15,
    position: 'absolute',
    left: 235
  },
  closeButton: {
    marginTop: 20,
    textAlign: 'center',
    color: 'blue',
    fontSize: 16,
  },

});

export default ProfileScreen;
